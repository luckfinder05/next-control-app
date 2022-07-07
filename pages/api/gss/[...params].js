import { authorize } from '../../../lib/google/google-auth';

const { google } = require('googleapis');
const APIkey = process.env.GOOGLE_API;
const spreadsheetId = process.env.SPREADSHEET_ID;
const SheetRange = 'Предписания!A:K';
const statsRange = 'Обзор!B8:B10'

const auth = authorize();
const googleService = google.sheets({ version: 'v4', auth });

async function handler(request, response) {
  const sheets = google.sheets({ version: 'v4' });
  const spreadSheetRequest = {
    spreadsheetId: spreadsheetId,
    range: SheetRange,
    key: APIkey
  }
  if (request.method === 'GET') {
    if (request.url.split('/').at(-1) === 'getData') {

      try {
        const result = (await sheets.spreadsheets.values.get(spreadSheetRequest)).data.values;
        return response.status(200).json(transformData(result));
      } catch (err) {
        console.error(err);
        return response.status(500).send({ error: err })
      }
    }
    else if (request.url.split('/').at(-1) === 'getContractors') {
      const result = (await sheets.spreadsheets.values.get(spreadSheetRequest)).data.values;
      const contractorsList = [...new Set(transformData(result).map((el) => el["Подрядчик"]))]
      return response.status(200).json(contractorsList);

    }
    else if (request.url.split('/').at(-1) === 'getStats') {
      const result = await getStats();
      return response.status(200).json(result)
    }
  } else if (request.method === 'POST') {
    const values = [
      request.body['_uid'],
      request.body['№ предписания'],
      request.body['№ замечания'],
      request.body['Вид контроля'],
      request.body['Дата выдачи замечания'],
      request.body['Содержание предписания'],
      request.body['Статус замечания'],
      request.body["Дата устранения"],
      request.body['Подрядчик'],
      request.body['Представитель ССК'],
      request.body['Примечание']
    ]

    try {
      const result = await appendValues(values)
      return response.status(200).send({ message: "ok", data: request.body, result: result.data });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: "error", error })
    }
  }
  return null
}

async function getStats() {
  const sheets = google.sheets({ version: 'v4' });
  const requestObject = {
    spreadsheetId: spreadsheetId,
    range: SheetRange,
    key: APIkey
  }
  requestObject.range = statsRange;
  const stats = (await sheets.spreadsheets.values.get(requestObject)).data.values;
  const [total, resolved, unresolved] = stats.map(el => el[0]);

  requestObject.range = 'Обзор!A24:E62'
  const weeklyGivenList = (await sheets.spreadsheets.values.get(requestObject)).data.values;
  const weeklyGivenCount = weeklyGivenList ? weeklyGivenList.length : 0;

  requestObject.range = 'Обзор!I24:O62';
  const weeklyResolvedList = (await sheets.spreadsheets.values.get(requestObject)).data.values;
  const weeklyResolvedCount = weeklyResolvedList ? weeklyResolvedList.length : 0;

  requestObject.range = 'Сводная таблица!A:G';
  const unresolvedStatsList = (await sheets.spreadsheets.values.get(requestObject))
    .data.values.slice(2).map(el => {
      return [el[0].slice(el[0].indexOf('(') + 1, -1), el.at(-1)]
    });
  const unresolvedStatsCount = weeklyResolvedList ? weeklyResolvedList.length : 0;

  const result = {
    total,
    resolved,
    unresolved,
    weeklyGivenCount,
    weeklyGivenList,
    weeklyResolvedCount,
    weeklyResolvedList,
    unresolvedStatsCount,
    unresolvedStatsList
  }

  return result;
}

function transformData(rows) {
  if (rows.length) {
    const arr = rows.slice(1);
    const result = arr.map((row) => {
      return {
        '_uid': row[0],
        '№ предписания': row[1],
        '№ замечания': row[2],
        'Вид контроля': row[3] || '',
        'Дата выдачи замечания': row[4],
        'Содержание предписания': row[5],
        'Статус замечания': row[6],
        'Дата устранения': row[7] || '',
        'Подрядчик': row[8] || '',
        'Представитель ССК': row[9] || '',
        'Примечание': row[10] || ''
      }
    });
    return result;
  } else { return null; }
}

/**
 * Appends values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to append.
 * @param {object} valueInputOption Value input options.
 * @param {(string[])[]} _values A 2d array of values to append.
 * @return {obj} spreadsheet information
 */
async function appendValues(_values) {
  try {
    let values = [
      [
        ..._values
      ],

    ];
    const resource = {
      values,
    };

    const result = await googleService.spreadsheets.values.append({
      spreadsheetId,
      range: SheetRange,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource,
    });

    const sheetProperties = await getSheetId(auth, spreadsheetId, SheetRange)
    if (sheetProperties.sheetId) {
      const borderStyle = {
        "style": "SOLID",
        "width": 1,
        "color": {
          "red": 0,
          "green": 0,
          "blue": 0
        },
      }

      await googleService.spreadsheets.batchUpdate({
        spreadsheetId,
        "resource": {
          "requests": [
            {
              "updateBorders": {
                "range": {
                  "sheetId": sheetProperties.sheetId,
                  "startRowIndex": 0,
                  "endRowIndex": sheetProperties.gridProperties.rowCount,
                  "startColumnIndex": 0,
                  "endColumnIndex": sheetProperties.gridProperties.columnCount
                },
                "innerHorizontal": borderStyle,
                "innerVertical": borderStyle
              }
            }

          ]
        }
      })
      return result;
    } else {
      console.error('Не удалось получить sheetId')
      return null;
    }
  } catch (err) {
    console.error(err)
    throw err;
  }
}

async function getSheetId(auth, spreadsheetId, range) {
  try {
    const request = {
      spreadsheetId: spreadsheetId,
      ranges: range,
      includeGridData: false,
      auth,
    };

    const res = await googleService.spreadsheets.get(request)
    return (res.data.sheets[0].properties)
  } catch (error) {
    console.error("Error getting sheetId!", error)
    return false
  }
}

export default handler;


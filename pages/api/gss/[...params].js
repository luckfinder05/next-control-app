import { authorize } from '../../../lib/google/google-auth';

const { google } = require('googleapis');
const APIkey = process.env.GOOGLE_API;
const spreadsheetId = process.env.SPREADSHEET_ID;
const ordersSheetRange = 'Предписания!A:K';
const statsRange = 'Обзор!B8:B10';
const unresolvedStatsRange = 'Сводная таблица!A:G';
const weeklyGivenRange = 'Обзор!A24:E62';
const weeklyResolvedRange = 'Обзор!I24:O62';
const ordersHeaders = [
  '_uid',
  '№ предписания',
  '№ замечания',
  'Вид контроля',
  'Дата выдачи замечания',
  'Содержание предписания',
  'Статус замечания',
  "Дата устранения",
  'Подрядчик',
  'Представитель ССК',
  'Примечание']

const auth = authorize();
const googleService = google.sheets({ version: 'v4', auth });

async function handler(request, response) {
  if (request.method === 'GET') {
    if (request.url.split('/').at(-1) === 'getData') {
      try {
        const result = await getValuesFromRange(ordersSheetRange);
        return response.status(200).json(transformOrdersData(result));
      } catch (err) {
        console.error(err);
        return response.status(500).send({ error: err })
      }
    }
    else if (request.url.split('/').at(-1) === 'getContractors') {
      const result = await getValuesFromRange(ordersSheetRange)
      const contractorsList = [...new Set(transformOrdersData(result).map((el) => el["Подрядчик"]))]
      return response.status(200).json(contractorsList);

    }
    else if (request.url.split('/').at(-1) === 'getStats') {
      const result = await getStats();
      return response.status(200).json(result)
    }
  } else if (request.method === 'POST') {
    ordersHeaders.map(header => {
      return request.body[header]
    })
    const values = ordersHeaders.map(header => request.body[header])

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

  const stats = await getValuesFromRange(statsRange)
  const [total, resolved, unresolved] = stats.map(el => el[0]);

  const weeklyGivenList = await getValuesFromRange(weeklyGivenRange)
  const weeklyGivenCount = weeklyGivenList.length;

  const weeklyResolvedList = await getValuesFromRange(weeklyResolvedRange)
  const weeklyResolvedCount = weeklyResolvedList.length;

  //Data from Pivot Table
  const unresolvedStatsList = (await getValuesFromRange(unresolvedStatsRange))
    .slice(2).map(el => {
      return [el[0].slice(el[0].indexOf('(') + 1, -1), el.at(-1)]
    });
  const unresolvedStatsCount = unresolvedStatsList.length;


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

async function getValuesFromRange(range) {
  const sheets = google.sheets({ version: 'v4' });
  const requestObject = {
    spreadsheetId,
    range,
    key: APIkey
  }
  const result = (await sheets.spreadsheets.values.get(requestObject)).data.values;
  if (!result) return []
  return result;
}

function transformOrdersData(rows) {
  if (rows.length) {
    const result = rows.slice(1).map((row) => {
      return row.reduce((result, cell, index) => {
        const header = ordersHeaders[index];
        result[header] = cell;
        return result
      }, {});
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
      range: ordersSheetRange,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource,
    });

    const sheetProperties = await getSheetId(auth, spreadsheetId, ordersSheetRange)
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


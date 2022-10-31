import { google } from 'googleapis';
import { authorize } from './google-auth';

const spreadsheetId = process.env.SPREADSHEET_ID;

const ordersSheetRange = 'Предписания!A:N';

export const ordersHeaders = [
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
  'Примечание',
  "Место обнаружения нарушения",
  "Предписано/Методы устранения",
  "Срок устранения"
]

export async function getValuesFromRange(range) {
  const sheets = google.sheets({ version: 'v4', auth: auth });
  const requestObject = {
    spreadsheetId,
    range
  }
  const result = (await sheets.spreadsheets.values.get(requestObject)).data.values;
  if (!result) return []
  return result;
}

export function transformOrdersData(rows) {
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
export async function appendValues(_values) {
  try {
    let values = [
      [
        ..._values
      ],
    ];
    const resource = {
      values
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

const auth = authorize();
const googleService = google.sheets({ version: 'v4', auth });
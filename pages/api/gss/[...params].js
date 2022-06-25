import { authorize } from '../../../lib/google/google-auth';

const { google } = require('googleapis');
const APIkey = process.env.GOOGLE_API;
const spreadsheetId = process.env.SPREADSHEET_ID;
const SheetRange = 'Предписания!A:K';

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


    // spreadSheetRequest.range = (await (await sheets.spreadsheets.values.get(spreadSheetRequest)).data.range)
    // console.log('spreadSheetRequest.range: ', spreadSheetRequest.range);

    const result = await appendValues(values)
    console.log('result: ', result);
    return response.status(200).send({ message: "ok", data: request.body, result });



    /*
        try {
          const ssResponse = (await sheets.spreadsheets.values.append(spreadSheetRequest)).data;
          // TODO: Change code below to process the `response` object:
          console.log(JSON.stringify(ssResponse, null, 2));
          return response.status(200).send({ message: "ok", data: request.body, ssResponse });
        } catch (err) {
          console.error(err);
        }
    
     */
  }
  return null
}

function transformData(rows) {
  if (rows.length) {
    const arr = rows.slice(1);
    const result = arr.map((row) => {
      return {
        '_uid': row[0],
        '№ предписания': row[1],
        '№ замечания': row[2],
        'Вид контроля': row[3],
        'Дата выдачи замечания': row[4],
        'Содержание предписания': row[5],
        'Статус замечания': row[6],
        'Дата устранения': row[7],
        'Подрядчик': row[8],
        'Представитель ССК': row[9],
        'Примечание': row[10]
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
  const { GoogleAuth } = require('google-auth-library');
  const { google } = require('googleapis');

  // const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/spreadsheet' });

  return authorize(
    async (auth) => {


      const service = google.sheets({ version: 'v4', auth });
      let values = [
        [
          ..._values
        ],

      ];
      const resource = {
        values,
      };
      try {
        const result = await service.spreadsheets.values.append({
          spreadsheetId,
          range: SheetRange,
          valueInputOption: "USER_ENTERED",
          resource,
        });
        console.log(`${result} cells appended.`);
        return result;
      } catch (err) {
        // TODO (developer) - Handle exception
        console.error(err)
        throw err;
      }
    })
}

export default handler;

/* 






*/
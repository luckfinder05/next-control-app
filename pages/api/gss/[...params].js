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
      const result = (await sheets.spreadsheets.values.get(request)).data.values;
      const contractorsList = [...new Set(transformData(result).map((el) => el["Подрядчик"]))]
      return response.status(200).json(contractorsList);

    }
  } else if (request.method === 'POST') {
    return response.status(200).send({ message: "ok", data: request.body });
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

export default handler;

/* 






*/
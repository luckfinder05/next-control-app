const { google } = require('googleapis');
const APIkey = 'AIzaSyDux7EnRrBcWiQ-Bab_xOSSjZZPiP6S5u4';
const spreadsheetId = '15qJi39meo8qPe_7dXblg-CMiET_rVCuBguwXhxrcQm0';
const SheetRange = 'Предписания!A:K';

async function handler(request, response) {
  const sheets = google.sheets({ version: 'v4' });

  function transformData(rows) {
    console.log('rows: ', Array.isArray(rows));

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

  try {
    const request = {
      spreadsheetId: spreadsheetId,
      range: SheetRange,
      key: APIkey
    }
    const result = (await sheets.spreadsheets.values.get(request)).data.values;
    response.status(200).json(transformData(result));
  } catch (err) {
    console.error(err);
    response.status(500).send({ error: err })
  }
}

export default handler;

/* 






*/
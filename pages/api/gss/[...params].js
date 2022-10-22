import { transformOrdersData, getValuesFromRange, ordersHeaders, appendValues } from './lib'

const ordersSheetRange = 'Предписания!A:K';
// const statsRange = 'Обзор!B8:B10';
const unresolvedStatsRange = 'stats!A:D';
const weeklyGivenRange = 'weeklyGiven!A:E';
const weeklyResolvedRange = 'weeklyResolved!A:F';
const weeklyDocumentsRange = 'weeklyDocuments!A:B';
const completeWorksRange = 'АППР!A:G';


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
      const result = await getStatsController();
      return response.status(200).json(result)
    }
  } else if (request.method === 'POST') {
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

async function getStatsController() {

  // const stats = await getValuesFromRange(statsRange)
  // const [total, resolved, unresolved] = stats.map(el => el[0]);

  const weeklyGivenList = (await getValuesFromRange(weeklyGivenRange)).slice(1);
  const weeklyGivenCount = weeklyGivenList.length;

  const weeklyResolvedList = (await getValuesFromRange(weeklyResolvedRange)).slice(1);
  const weeklyResolvedCount = weeklyResolvedList.length;

  const unresolvedStats = await getValuesFromRange(unresolvedStatsRange);
  const [unresolved, resolved, total] = unresolvedStats[1].slice(1);
  const unresolvedStatsList = unresolvedStats.slice(2)
    .map(el => {
      return [el[0], el[1]]
    }).filter(el => el[1] != 0);
  const unresolvedStatsCount = unresolvedStatsList.length;

  const weeklyDocumentsList = (await getValuesFromRange(weeklyDocumentsRange)).slice(1);
  if (weeklyDocumentsList.length === 0) weeklyDocumentsList.push(['', 'За отчётный период документация не передавалась'])
  const weeklyDocumentsCount = weeklyDocumentsList.length;

  const completeWorksList = (await getValuesFromRange(completeWorksRange)).slice(1);
  const completeWorksCount = completeWorksList.length;


  return {
    total,
    resolved,
    unresolved,
    weeklyGivenCount,
    weeklyGivenList,
    weeklyResolvedCount,
    weeklyResolvedList,
    unresolvedStatsCount,
    unresolvedStatsList,
    weeklyDocumentsList,
    weeklyDocumentsCount,
    completeWorksList,
    completeWorksCount
  }
}

export default handler;

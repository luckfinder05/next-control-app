import { transformOrdersData, getValuesFromRange, ordersHeaders, appendValues } from './lib'

const ordersSheetRange = 'Предписания!A:K';
const statsRange = 'Обзор!B8:B10';
const unresolvedStatsRange = 'Подрядчики!A:G';
const weeklyGivenRange = 'Обзор!A24:E62';
const weeklyResolvedRange = 'Обзор!I24:O62';

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

  return {
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
}

export default handler;

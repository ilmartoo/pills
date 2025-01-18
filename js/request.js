/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * @typedef {{ header: string[]; rows: string[][] }} RequestResult
 */

/**
 * Request the data of a given sheet.
 * @async
 * @param {Type} type Sheet to request.
 * @param {string} [query] SQL query to apply.
 * @returns {RequestResult} Array with the data.
 */
async function requestPills(type, query) {
    let queryURL = `https://docs.google.com/spreadsheets/d/${Config.SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${type}`;
    if (query !== undefined) { queryURL += `&tq=${encodeURI(query)}`; }

    const response = await fetch(queryURL, {
        method: 'GET',
    });
    // const response = { text: () => Mocks[type] };    

    debug('[RECIEVED]');

    const text = await response.text();

    debug(text);

    const data = CSV.parse(text, true);
    return { header: data.header, rows: data.data };
}

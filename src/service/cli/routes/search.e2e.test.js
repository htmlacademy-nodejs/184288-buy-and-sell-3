'use strict';

const request = require(`supertest`);
const server = require(`./server`);

const {initializeOffersDatabase, clearOffersDatabase, mockData} = require(`../../utils/prepareDataForTests`);

describe(`Search API end-points`, () => {
  test(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/search`);
    expect(res.statusCode).toBe(200);
  });

  test(``, async () => {
    const res = await request(server).get(`/search`).query({query: `TEST`});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([mockData[0]]);
  });
});

'use strict';

const request = require(`supertest`);
const serverApi = require(`../server`);

let server;
// let getMockData

const {initializeOffersDatabase} = require(`../../utils/prepareDataForTests`);

beforeAll(async () => {
  server = await serverApi.createServer();
  initializeOffersDatabase();
});

describe(`Search API end-points`, () => {
  test(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/search`).query({query: `TEST`});
    expect(res.statusCode).toBe(200);
  });

  test(`1 offer found`, async () => {
    const res = await request(server).get(`/search`).query({query: `TEST`});
    expect(res.body.length).toBe(1);
  });

  test(`Offer has correct id`, async () => {
    const res = await request(server).get(`/search`).query({query: `TEST`});
    expect(res.body[0].id).toBe(`1`)
  });

  test(`API returns empty array if nothing is found`, async () => {
    const res = await request(server).get(`/search`).query({query: `Продам свою душу`});
    expect(res.body.length).toBe(0);
  });
});

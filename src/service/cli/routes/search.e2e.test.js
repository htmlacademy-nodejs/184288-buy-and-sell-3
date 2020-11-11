'use strict';

const request = require(`supertest`);
const server = require(`./server`);

const {initializeOffersDatabase, clearOffersDatabase} = require(`../../utils/prepareDataForTests`);

describe(`Search API end-points`, () => {
  beforeAll(() => {
    initializeOffersDatabase();
  });

  afterAll(() => {
    clearOffersDatabase();
  });

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

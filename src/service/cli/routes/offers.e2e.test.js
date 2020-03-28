'use strict';

const request = require(`supertest`);
const server = require(`./server`);

describe(`Offers API end-points`, () => {
  test(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/offers`);
    expect(res.statusCode).toBe(200);
  });
});

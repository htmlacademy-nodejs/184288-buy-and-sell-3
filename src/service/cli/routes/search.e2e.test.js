'use strict';

const request = require(`supertest`);
const server = require(`./server`);

describe(`Search API end-points`, () => {
  test(`Test`, async () => {
    await request(server)
      .get(`/search`)
      .expect('Content-Type', `application/json; charset=utf-8`)
      .expect(200);
  });
});

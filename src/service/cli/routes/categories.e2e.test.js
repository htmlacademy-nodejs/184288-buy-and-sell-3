'use strict';

const request = require(`supertest`);
const serverApi = require(`../server`);

let server;

const categoires = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

beforeAll(async () => {
  server = await serverApi.createServer();
});

describe(`Categories API end-points`, () => {
  test(`When get categories status code should be 200`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.statusCode).toBe(200);
  });

  test(`When get categories data length should be equal 6`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body.length).toBe(6);
  });

  test(`When get categories data should be equal`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body).toEqual(categoires);
  });
});

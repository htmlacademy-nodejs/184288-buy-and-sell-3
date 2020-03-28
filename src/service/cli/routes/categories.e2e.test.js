'use strict';

const request = require(`supertest`);
const server = require(`./server`);

const categoires = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

describe(`Categories API end-points`, () => {
  test(`When get categories status code should be 200`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.statusCode).toBe(200);
  });

  test(`When get categories data length should be equal 6`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body.length).toBe(6);
  });

  test(`When get categories data length should not be less than 6`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body.length).not.toBeLessThan(6);
  });

  test(`When get categories data length should not be more than 6`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body.length).not.toBeGreaterThan(6);
  });

  test(`When get categories data should be equal`, async () => {
    const res = await request(server).get(`/categories`);
    expect(res.body).toEqual(categoires);
  });
});

'use strict';

const request = require(`supertest`);
const server = require(`./server`);
const {initializeOffersDatabase, clearOffersDatabase} = require(`../../utils/prepareDataForTests`);

const offerKeys = [`id`, `title`, `picture`, `description`, `type`, `sum`, `сategory`, `comments`];

const postOfferData = {
  "title": "Куплю антиквариат.",
  "picture": "item00.jpg",
  "description": [
    "Кажется, что это хрупкая вещь.",
    "При покупке с меня бесплатная доставка в черте города."
  ],
  "type": "offer",
  "sum": 4667,
  "сategory": [
    "Посуда"
  ],
  "comments": [
    {
      "id": "BW1qOk",
      "text": "Оплата наличными или перевод на карту?"
    },
    {
      "id": "DDgAGS",
      "text": {
        "text": "tesaasd"
      }
    },
    {
      "id": "kAOd7a",
      "text": "tesaasd"
    }
  ]
};

describe(`Offers API end-points`, () => {
  beforeAll(() => {
    initializeOffersDatabase();
  });

  afterAll(() => {
    clearOffersDatabase();
  });

  test(`When get offers status code should be 200`, async () => {
    const res = await request(server).get(`/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`When get offer by ID data should be contain following keys`, async () => {
    const res = await request(server).get(`/offers/1`);
    expect(res.statusCode).toBe(200);
    offerKeys.forEach(key => expect(res.body).toHaveProperty(key));
  });

  test(`When POST offer request was Success. Offers amount stould be +1`, async () => {
    const res = await request(server).get(`/offers`);
    const initAmount = res.body.length;
    await request(server).post(`/offers`).send(postOfferData);
    const newRes = await request(server).get(`/offers`);
    const newAmount = newRes.body.length;
    expect(newAmount).toBe(initAmount + 1);
  });
});

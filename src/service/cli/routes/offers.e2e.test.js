'use strict';

const request = require(`supertest`);
const find = require(`lodash/find`);

const server = require(`./server`);
const {initializeOffersDatabase, clearOffersDatabase, mockData} = require(`../../utils/prepareDataForTests`);

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

const putOfferData = {
  "id": "1",
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

const getOfferData = {
  "id": "2",
  "title": "Продам Куплю новую приставку Sony Playstation 5.",
  "picture": "item14.jpg",
  "description": [
    "Товар в отличном состоянии.",
    "Это настоящая находка для коллекционера!"
  ],
  "type": "offer",
  "sum": 69196,
  "сategory": [
    "Журналы",
    "Разное"
  ],
  "comments": [
    {
      "id": "UFDHfT",
      "text": "А сколько игр в комплекте?"
    },
    {
      "id": "tMJGgq",
      "text": "С чем связана продажа? Почему так дешёво?"
    },
    {
      "id": "LRFSlR",
      "text": "Неплохо, но дорого"
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

  test(`When GET offers status code should be 200`, async () => {
    const res = await request(server).get(`/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`When GET offer by ID data should be contain following keys`, async () => {
    const res = await request(server).get(`/offers/1`);
    expect(res.statusCode).toBe(200);
    offerKeys.forEach(key => expect(res.body).toHaveProperty(key));
    expect(res.body).toEqual(mockData[0]);
  });

  test(`When POST offer request was Success. Offers amount stould be +1`, async () => {
    const res = await request(server).get(`/offers`);
    const initAmount = res.body.length;
    await request(server).post(`/offers`).send(postOfferData);
    const newRes = await request(server).get(`/offers`);
    const newAmount = newRes.body.length;
    expect(newAmount).toBe(initAmount + 1);
  });

  test(`PUT. Check that offer was changed`, async () => {
    const res = await request(server).put(`/offers/1`).send(putOfferData);
    expect(res.statusCode).toBe(200);
    const getRes = await request(server).get(`/offers/1`);
    expect(getRes.body).toEqual(putOfferData);
  });

  test(`GET. Chech get offer by ID`, async () => {
    const res = await request(server).get(`/offers/2`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(getOfferData);
  });

  test(`DELETE. Chech that offer was removed`, async () => {
    const deleteRes = await request(server).delete(`/offers/3`);
    expect(deleteRes.statusCode).toBe(200);
    const getRes = await request(server).get(`/offers/3`);
    expect(getRes.statusCode).toBe(404);
  });

  test(`DELETE. Check that offer was not removed because ID hadn't been founded`, async () => {
    const deleteRes = await request(server).delete(`/offers/4`);
    expect(deleteRes.statusCode).toBe(404);
  });

  test(`GET. Check comments by offer ID`, async () => {
    const res = await request(server).get(`/offers/5/comments`);
    expect(res.statusCode).toBe(200);
    const {comments} = find(mockData, [`id`, `5`]);
    expect(res.body).toEqual(comments);
  });

  test(`GET. Check that comments by offer ID not found`, async () => {
    const res = await request(server).get(`/offers/4/comments`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test(`DELETE. Check that comment was removed by ID`, async () => {
    const deleteRes = await request(server).delete(`/offers/5/comments/pK-Mbj`);
    expect(deleteRes.statusCode).toBe(200);
    const res = await request(server).get(`/offers/5/comments`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test(`POST. Check that comment was created`, async () => {
    const postRes = await request(server).post(`/offers/5/comments`).send({text: `Test comment`});
    expect(postRes.statusCode).toBe(200);
    const res = await request(server).get(`/offers/5/comments`);
    expect(res.statusCode).toBe(200);
    const {text} = res.body.filter(item => item.text === `Test comment`)[0];
    expect(text).toEqual(`Test comment`);
  });
});

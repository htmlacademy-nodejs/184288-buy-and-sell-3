'use strict';

const fs = require(`fs`).promises;

const FILE_NAME = `mocks.json`;

const mockData = [
  {
    "id": "1",
    "title": "TEST",
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
  },
  {
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
  },
  {
    "id": "3",
    "title": "Продам коллекцию журналов «Огонёк».",
    "picture": "item07.jpg",
    "description": [
      "Кажется, что это хрупкая вещь.",
      "Если товар не понравится — верну всё до последней копейки.",
      "Даю недельную гарантию."
    ],
    "type": "offer",
    "sum": 70629,
    "сategory": [
      "Книги",
      "Игры"
    ],
    "comments": [
      {
        "id": "pK-Mbj",
        "text": "С чем связана продажа? Почему так дешёво?"
      }
    ]
  },
  {
    "id": "5",
    "title": "Test comments by ID",
    "picture": "item07.jpg",
    "description": [
      "Кажется, что это хрупкая вещь.",
      "Если товар не понравится — верну всё до последней копейки.",
      "Даю недельную гарантию."
    ],
    "type": "offer",
    "sum": 70629,
    "сategory": [
      "Книги",
      "Игры"
    ],
    "comments": [
      {
        "id": "pK-Mbj",
        "text": "С чем связана продажа? Почему так дешёво?"
      }
    ]
  },
];

const initializeOffersDatabase = async () => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const preparedFileContent = JSON.parse(fileContent);

    await fs.writeFile(FILE_NAME, JSON.stringify(mockData, null, `  `));
  } catch (error) {
    console.error(error);
  }
};

const clearOffersDatabase = async () => {
  try {
    await fs.writeFile(FILE_NAME, JSON.stringify([], null, `  `));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  initializeOffersDatabase,
  clearOffersDatabase,
  mockData,
};

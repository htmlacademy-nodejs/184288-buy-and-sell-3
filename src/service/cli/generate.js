'use strict';

const fs = require(`fs`);
const random = require(`lodash/random`);
const take = require(`lodash/take`);

const {
  EXIT_CODE,
} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_SUM = 1000;
const MAX_SUM = 100000;
const MIN_PICTURE_NUMBER = 0;
const MAX_PICTURE_NUMBER = 16;

const TYPES = [
  `offer`,
  `sale`,
];

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const getRandomElement = (array) => array[random(array.length - 1)];

const shuffleArray = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getDescription = (sentences) => {
  const descriptionSentences = random(1, MAX_DESCRIPTION_SENTENCES);
  const shuffledSentences = shuffleArray(sentences);

  return take(shuffledSentences, descriptionSentences);
};

const getCategories = (categories) => {
  const randomLength = random(1, categories.length - 1);
  const shuffledCategories = shuffleArray(categories);
  const preparedCategories = take(shuffledCategories, randomLength);

  return preparedCategories;
};

const getPicture = () => {
  const number = random(MIN_PICTURE_NUMBER, MAX_PICTURE_NUMBER);

  return number < 10
    ? `item0${number}.jpg`
    : `item${number}.jpg`;
};

const getAdverts = (count) => (
  [...Array(count)].map(() => {
    const title = getRandomElement(TITLES);
    const picture = getPicture();
    const description = getDescription(SENTENCES);
    const type = getRandomElement(TYPES);
    const sum = random(MIN_SUM, MAX_SUM);
    const сategory = getCategories(CATEGORIES);

    return {
      title,
      picture,
      description,
      type,
      sum,
      сategory,
    };
  })
);

module.exports = {
  name: `--generate`,
  run: (args) => {
    const [count] = args;
    let countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPublications <= 0) {
      console.error(`Параметр <count> не может быть отрицательным`);
      return process.exit(EXIT_CODE.ERROR);
    }

    if (countPublications > MAX_COUNT) {
      console.error(`Не больше ${MAX_COUNT} публикаций`);
      return process.exit(EXIT_CODE.ERROR);
    }

    const publications = getAdverts(countPublications);

    fs.writeFile(FILE_NAME, JSON.stringify(publications, null, `  `), (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        return process.exit(EXIT_CODE.ERROR);
      }

      console.log(`Operation success. File created.`);
      return process.exit(EXIT_CODE.SUCCESS);
    });

    return publications;
  },
};

'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const random = require(`lodash/random`);
const take = require(`lodash/take`);

const {
  EXIT_CODE,
} = require(`../../constants`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

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

const getAdverts = (count, titles, sentences, categories) => (
  [...Array(count)].map(() => {
    const title = getRandomElement(titles);
    const picture = getPicture();
    const description = getDescription(sentences);
    const type = getRandomElement(TYPES);
    const sum = random(MIN_SUM, MAX_SUM);
    const сategory = getCategories(categories);

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

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const [count] = args;
    let countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countPublications <= 0) {
      console.error(chalk.red(`Параметр <count> не может быть отрицательным`));
      return process.exit(EXIT_CODE.ERROR);
    }

    if (countPublications > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций`));
      return process.exit(EXIT_CODE.ERROR);
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const publications = getAdverts(countPublications, titles, sentences, categories);
    const preparedPublications = JSON.stringify(publications, null, `  `);

    try {
      await fs.writeFile(FILE_NAME, preparedPublications);
      console.log(chalk.green(`Operation success. File created.`));

      return process.exit(EXIT_CODE.SUCCESS);
    } catch (error) {
      console.error(`Can't write data to file...`);

      return process.exit(EXIT_CODE.ERROR);
    }
  },
};

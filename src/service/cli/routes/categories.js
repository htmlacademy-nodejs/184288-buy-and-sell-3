'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

const categoriesRoute = new Router();

const FILE_NAME = `data/categories.txt`;

const readMocks = async () => {
  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf8`);
    const mocks = fileContent.split(`\n`);
    return mocks;
  } catch (error) {
    logger.error(error);
    return [];
  }
};

categoriesRoute.get(`/`, async (req, res) => {
  const categories = await readMocks();
  logger.info(`End request with status code ${res.statusCode}`);
  return res.send(categories);
});

module.exports = categoriesRoute;

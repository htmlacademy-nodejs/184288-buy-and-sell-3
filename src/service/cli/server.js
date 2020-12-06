'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const bodyParser = require(`body-parser`);

const {BACKEND_BASE_URL} = require(`../../constants`);

const offersRoute = require(`./routes/offers`);
const categoriesRoute = require(`./routes/categories`);
const searchRoute = require(`./routes/search`);

const {getLogger} = require(`./logger`);
const logger = getLogger();
const pino = require(`express-pino-logger`)({logger});

const DEFAULT_PORT = 3000;

const createServer = async () => {
  const server = express();

  server.use(express.json());

  server.use(pino);
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: false}));

  server.use(`${BACKEND_BASE_URL}offers`, offersRoute);
  server.use(`${BACKEND_BASE_URL}categories`, categoriesRoute);
  server.use(`${BACKEND_BASE_URL}search`, searchRoute);
  server.use((_req, res) => res.status(404).send({ok: false}));

  server.use((req, res, next) => {
    logger.debug(`Request on route ${req.url}`);
    res.on(`finish`, () => {
      logger.info(`Response status code ${res.statusCode}`);
    });
    next();
  });

  server.use((req, res) => {
    res.status(404)
      .send(`Not found`);
    logger.error(`Route not found: ${req.url}`);
  });

  server.use((err, _req, _res, _next) => {
    logger.error(`An error occured on processing request: ${err.message}`);
  });

  server.use((_err, _req, res, _) => {
    res
      .status(500)
      .send(`Ошибка при создании сервера`);
  });

  return server;
};

const run = async (args) => {
  const [customPort] = args;
  const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

  if (customPort <= 0) {
    return console.log(chalk.red(`Порт не может быть отрицательным`));
  }

  const app = await createServer();

  app
    .listen(port, () => {
      logger.info(`Server start on ${port}`);
    })
    .on(`error`, (error) => {
      logger.error(`Server can't start. Error: ${error}`);
    });
};

module.exports = {
  name: `--server`,
  run,
  createServer,
};

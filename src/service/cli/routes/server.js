'use strict';

const express = require(`express`);
const bodyParser = require(`body-parser`);

const categoriesRoute = require(`./categories`);
const searchRoute = require(`./search`);
const offersRoute = require(`./offers`);

const {getLogger} = require(`../logger`);
const logger = getLogger();
const pino = require('express-pino-logger')({logger});

const port = 3000;

const server = express();

server.use(express.json());

server.use(pino);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use(`/offers`, offersRoute);
server.use(`/categories`, categoriesRoute);
server.use(`/search`, searchRoute);
server.use((req, res) => res.status(404).send({ok: false}));

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

app.use((err, _req, _res, _next) => {
  logger.error(`An error occured on processing request: ${err.message}`);
});

server.use((_err, _req, res, _) => {
  res
    .status(500)
    .send(`Ошибка при создании сервера`);
});

server
  .listen(port, () => {
    logger.info(`Server start on ${port}`);
  })
  .on(`error`, (error) => {
    logger.error(`Server can't start. Error: ${error}`);
  });

module.exports = server;

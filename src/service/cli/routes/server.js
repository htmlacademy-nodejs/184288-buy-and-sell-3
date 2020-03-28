'use strict';

const express = require(`express`);
const categoriesRoute = require(`./categories`);
const searchRoute = require(`./search`);
const offersRoute = require(`./offers`);
const server = express();

server.use(express.json());

server.use(`/offers`, offersRoute);
server.use(`/categories`, categoriesRoute);
server.use(`/search`, searchRoute);
server.use((req, res) => res.status(404).send({ok: false}));

module.exports = server;

'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRoute = require(`./routes/main`);
const registerRoute = require(`./routes/register`);
const loginRoute = require(`./routes/login`);
const myRoute = require(`./routes/my`);
const offersRoute = require(`./routes/offers`);
const searchRoute = require(`./routes/search`);

const DEFAULT_PORT = 8080;

const app = express();

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.join(__dirname, `templates`)));

app.use(`/`, mainRoute);
app.use(`/register`, registerRoute);
app.use(`/login`, loginRoute);
app.use(`/my`, myRoute);
app.use(`/offers`, offersRoute);
app.use(`/search`, searchRoute);

app
  .listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));

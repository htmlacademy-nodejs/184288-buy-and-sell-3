'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const bodyParser = require(`body-parser`);

const offersRoute = require(`./routes/offers`);
const categoriesRoute = require(`./routes/categories`);
const searchRoute = require(`./routes/search`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run: (args) => {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    if (customPort <= 0) {
      return console.log(chalk.red(`Порт не может быть отрицательным`));
    }

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(`/offers`, offersRoute);
    app.use(`/categories`, categoriesRoute);
    app.use(`/search`, searchRoute);

    app.use((err, req, res, _) => {
      res
        .status(500)
        .send(`Ошибка при создании сервера`);
    });

    return app
      .listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
  },
};

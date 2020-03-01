'use strict';

const {Router} = require(`express`);

const {tickets} = require(`../data/mock`);

const searchRoute = new Router();

searchRoute.get(`/`, (req, res) => {
  const pageContent = {
    title: `Главная страница`,
    tickets,
  };

  res.render(`pages/search-result`, pageContent);
});

module.exports = searchRoute;

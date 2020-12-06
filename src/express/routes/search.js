'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const API = getAPI();

const searchRoute = new Router();

searchRoute.get(`/`, async (req, res) => {
  const {query} = req;
  const [searchData, newTickets] = await Promise.all([API.searchOffers(query), API.getOffers()]);

  const pageContent = {
    title: `Главная страница`,
    tickets: searchData,
    newTickets,
  };

  res.render(`pages/search-result`, pageContent);
});

module.exports = searchRoute;

'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const API = getAPI();

const homeRoute = new Router();

homeRoute.get(`/`, async (_req, res) => {
  const [categories, offers] = await Promise.all([API.getCategories(), API.getOffers()]);

  const pageContent = {
    title: `Главная страница`,
    categories,
    newTickets: offers,
    popularTickers: offers,
  };

  res.render(`pages/main`, pageContent);
});

module.exports = homeRoute;

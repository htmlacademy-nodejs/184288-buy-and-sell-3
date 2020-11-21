'use strict';

const {Router} = require(`express`);

const {categoiresService, offersService} = require(`../api`);

const homeRoute = new Router();

homeRoute.get(`/`, async (_req, res) => {
  const categories = await categoiresService.getCategories();
  const offers = await offersService.getOffers();

  const pageContent = {
    title: `Главная страница`,
    categories,
    newTickets: offers,
    popularTickers: offers,
  };

  res.render(`pages/main`, pageContent);
});

module.exports = homeRoute;

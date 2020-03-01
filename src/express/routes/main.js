'use strict';

const {Router} = require(`express`);

const {categories, tickets, popularTickers} = require(`../data/mock`);

const homeRoute = new Router();

homeRoute.get(`/`, (req, res) => {
  const pageContent = {
    title: `Главная страница`,
    categories,
    newTickets: tickets,
    popularTickers,
  };

  res.render(`pages/main`, pageContent);
});

module.exports = homeRoute;

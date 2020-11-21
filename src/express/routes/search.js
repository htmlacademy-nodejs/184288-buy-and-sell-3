'use strict';

const {Router} = require(`express`);
const {searchService, offersService} = require(`../api`);

const searchRoute = new Router();

searchRoute.get(`/`, async (req, res) => {
  const {query} = req;
  const searchData = await searchService.searchOffers(query);
  const newTickets = await offersService.getOffers();

  const pageContent = {
    title: `Главная страница`,
    tickets: searchData,
    newTickets,
  };

  res.render(`pages/search-result`, pageContent);
});

module.exports = searchRoute;

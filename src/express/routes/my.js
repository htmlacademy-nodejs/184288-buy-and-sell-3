'use strict';

const {Router} = require(`express`);
const {take} = require(`lodash`);

const {tickets, comments} = require(`../data/mock`);
const {offersService} = require(`../api`);

const myRoute = new Router();

myRoute.get(`/`, async (_req, res) => {
  const offers = await offersService.getOffers();
  const pageContent = {
    title: `Куплю продам`,
    tickets: offers,
    comments,
  };
  console.log(`offers`, offers);
  return res.render(`pages/my-tickets`, pageContent);
});

myRoute.get(`/comments`, async (_req, res) => {
  const offers = await offersService.getOffers();
  const preparedOffers = take(offers, 3);
  const pageContent = {
    title: `Куплю продам`,
    tickets: preparedOffers,
    comments,
  };

  return res.render(`pages/comments`, pageContent);
});

module.exports = myRoute;

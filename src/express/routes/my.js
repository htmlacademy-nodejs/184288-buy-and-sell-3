'use strict';

const {Router} = require(`express`);

const {tickets, comments} = require(`../data/mock`);

const myRoute = new Router();

const pageContent = {
  title: `Куплю продам`,
  tickets,
  comments,
};

myRoute.get(`/`, (req, res) => {
  return res.render(`pages/my-tickets`, pageContent);
});

myRoute.get(`/comments`, (req, res) => {
  return res.render(`pages/comments`, pageContent);
});

module.exports = myRoute;

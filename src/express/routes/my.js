'use strict';

const {Router} = require(`express`);

const myRoute = new Router();

const pageContent = {
  title: `Куплю продам`,
};

myRoute.get(`/`, (req, res) => {
  return res.render(`my-tickets`, pageContent);
});

myRoute.get(`/comments`, (req, res) => {
  return res.render(`comments`, pageContent);
});

module.exports = myRoute;

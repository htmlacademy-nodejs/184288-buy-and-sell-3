'use strict';

const {Router} = require(`express`);

const {categories, tickets, comments} = require(`../data/mock`);

const offersRoute = new Router();

const pageContent = {
  title: `Главная страница`,
  categories,
  tickets,
  comments,
};

offersRoute.get(`/`, (req, res) => {
  return res.render(`pages/category`, pageContent);
});

offersRoute.get(`/add`, (req, res) => {
  return res.render(`pages/new-ticket`, pageContent);
});

offersRoute.get(`/:id`, (req, res) => {
  return res.render(`pages/comments`, pageContent);
});

offersRoute.get(`/edit/:id`, (req, res) => {
  return res.render(`pages/ticket-edit`, pageContent);
});

offersRoute.get(`/category/:id`, (req, res) => {
  return res.render(`pages/ticket`, pageContent);
});

module.exports = offersRoute;

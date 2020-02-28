'use strict';

const {Router} = require(`express`);

const loginRoute = new Router();

loginRoute.get(`/`, (req, res) => {
  return res.render(`login`);
});

module.exports = loginRoute;

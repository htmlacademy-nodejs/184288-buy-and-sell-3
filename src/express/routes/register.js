'use strict';

const {Router} = require(`express`);

const registerRoute = new Router();

registerRoute.get(`/`, (req, res) => {
  return res.render(`pages/sign-up`);
});

module.exports = registerRoute;

'use strict';

const {Router} = require(`express`);

const {comments} = require(`../data/mock`);
const {getAPI} = require(`../api`);
const upload = require(`../utils/upload`);

const offersRoute = new Router();

const API = getAPI();

const pageContent = {
  title: `Главная страница`,
  comments,
};

offersRoute.get(`/`, async (_req, res) => {
  const [categories, offers] = await Promise.all([API.getCategories(), API.getOffers()]);

  const content = {
    ...pageContent,
    categories,
    tickets: offers,
  };

  return res.render(`pages/category`, content);
});

offersRoute.get(`/add`, async (_req, res) => {
  const category = await API.getCategories();

  return res.render(`pages/new-ticket`, {...pageContent, category});
});

offersRoute.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category
  };

  try {
    await API.createOffer(offerData);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

offersRoute.get(`/:id`, (_req, res) => {
  return res.render(`pages/comments`, pageContent);
});

offersRoute.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  const [offer, category] = await Promise.all([
    API.getOfferById(id),
    API.getCategories(),
  ]);

  return res.render(`pages/ticket-edit`, {...pageContent, offer, category});
});

offersRoute.get(`/category/:id`, (_req, res) => {
  return res.render(`pages/ticket`, pageContent);
});

module.exports = offersRoute;

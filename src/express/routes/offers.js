'use strict';

const {Router} = require(`express`);

const {categories, tickets, comments} = require(`../data/mock`);
const {categoiresService, offersService} = require(`../api`);
const upload = require(`../utils/upload`);

const offersRoute = new Router();

const pageContent = {
  title: `Главная страница`,
  categories,
  tickets,
  comments,
};

offersRoute.get(`/`, async (_req, res) => {
  const category = await categoiresService.getCategories();
  const offers = await offersService.getOffers();
  const content = {
    ...pageContent,
    categories: category,
    tickets: offers,
  };

  return res.render(`pages/category`, content);
});

offersRoute.get(`/add`, async (_req, res) => {
  const category = await categoiresService.getCategories();

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
    await offersService.createOffer(offerData);
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
    offersService.getOfferById(id),
    categoiresService.getCategories(),
  ]);

  return res.render(`pages/ticket-edit`, {...pageContent, offer, category});
});

offersRoute.get(`/category/:id`, (_req, res) => {
  return res.render(`pages/ticket`, pageContent);
});

module.exports = offersRoute;

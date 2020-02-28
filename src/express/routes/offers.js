'use strict';

const {Router} = require(`express`);

const offersRoute = new Router();

const categories = [
  {label: `Дом`, src: `/img/cat.jpg`, srcset: `/img/cat@2x.jpg 2x`, count: `81`},
  {label: `Электроника`, src: `/img/cat02.jpg`, srcset: `/img/cat02@2x.jpg 2x`, count: `62`},
  {label: `Одежда`, src: `/img/cat03.jpg`, srcset: `/img/cat03@2x.jpg 2x`, count: `106`},
  {label: `Спорт/отдых`, src: `/img/cat04.jpg`, srcset: `/img/cat04@2x.jpg 2x`, count: `86`},
  {label: `Авто`, src: `/img/cat05.jpg`, srcset: `/img/cat05@2x.jpg 2x`, count: `34`},
  {label: `Книги`, src: `/img/cat06.jpg`, srcset: `/img/cat06@2x.jpg 2x`, count: `92`}
];

const pageContent = {
  title: `Главная страница`,
  categories,
};

offersRoute.get(`/`, (req, res) => {
  return res.render(`category`, pageContent);
});

offersRoute.get(`/add`, (req, res) => {
  return res.render(`new-ticket`, pageContent);
});

offersRoute.get(`/:id`, (req, res) => res.send(`/offers/${req.params.id}`));

offersRoute.get(`/edit/:id`, (req, res) => {
  return res.render(`ticket-edit`, pageContent);
});

offersRoute.get(`/category/:id`, (req, res) => {
  return res.render(`ticket`, pageContent);
});

module.exports = offersRoute;

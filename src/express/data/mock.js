'use strict';

const categories = [
  {label: `Дом`, src: `/img/cat.jpg`, srcset: `/img/cat@2x.jpg 2x`, count: `81`},
  {label: `Электроника`, src: `/img/cat02.jpg`, srcset: `/img/cat02@2x.jpg 2x`, count: `62`},
  {label: `Одежда`, src: `/img/cat03.jpg`, srcset: `/img/cat03@2x.jpg 2x`, count: `106`},
  {label: `Спорт/отдых`, src: `/img/cat04.jpg`, srcset: `/img/cat04@2x.jpg 2x`, count: `86`},
  {label: `Авто`, src: `/img/cat05.jpg`, srcset: `/img/cat05@2x.jpg 2x`, count: `34`},
  {label: `Книги`, src: `/img/cat06.jpg`, srcset: `/img/cat06@2x.jpg 2x`, count: `92`}
];

const tickets = [
  {label: `Куплю`, categories: [`Дом`], src: `/img/item01.jpg`, srcset: `/img/item01@2x.jpg 2x`, title: `Монстера`, price: `1000`, description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`},
  {label: `ПРОДАМ`, categories: [`Дом`], src: `/img/item02.jpg`, srcset: `img/item02@2x.jpg 2x`, title: `Мое старое кресло`, price: `4000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
  {label: `ПРОДАМ`, categories: [`Дом`, `ЭЛЕКТРОНИКА`], src: `/img/item03.jpg`, srcset: `/img/item03@2x.jpg 2x`, title: `Дедушкины часы`, price: `45 000`, description: `Продаю дедушкины часы в прекрасном состоянии, ходят до...`},
  {label: `Куплю`, categories: [`Дом`], src: `/img/item04.jpg`, srcset: `/img/item04@2x.jpg 2x`, title: `Кофеварка`, price: `2000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
  {label: `ПРОДАМ`, categories: [`Авто`, `ЭЛЕКТРОНИКА`], src: `/img/item05.jpg`, srcset: `/img/item05@2x.jpg 2x`, title: `Ленд Ровер`, price: `900 000`, description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`},
  {label: `ПРОДАМ`, categories: [`ЭЛЕКТРОНИКА`], src: `/img/item06.jpg`, srcset: `/img/item06@2x.jpg 2x`, title: `Ableton`, price: `88 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
  {label: `ПРОДАМ`, categories: [`Спорт и отдых`], src: `/img/item07.jpg`, srcset: `/img/item07@2x.jpg 2x`, title: `Доска`, price: `55 000`, description: `Продаю дедушкины часы в прекрасном состоянии, ходят до...`},
  {label: `Куплю`, categories: [`ЭЛЕКТРОНИКА`], src: `/img/item08.jpg`, srcset: `/img/item08@2x.jpg 2x`, title: `Фотик Canon`, price: `32 000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
];

const popularTickers = [
  {label: `ПРОДАМ`, categories: [`Авто`, `ЭЛЕКТРОНИКА`], src: `/img/item05.jpg`, srcset: `/img/item05@2x.jpg 2x`, title: `Ленд Ровер`, price: `900 000`, description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`},
  {label: `ПРОДАМ`, categories: [`ЭЛЕКТРОНИКА`], src: `/img/item06.jpg`, srcset: `/img/item06@2x.jpg 2x`, title: `Ableton`, price: `88 000`, description: `Продам свое старое кресло, чтобы сидеть и читать книги зимними...`},
  {label: `ПРОДАМ`, categories: [`Спорт и отдых`], src: `/img/item07.jpg`, srcset: `/img/item07@2x.jpg 2x`, title: `Доска`, price: `55 000`, description: `Продаю дедушкины часы в прекрасном состоянии, ходят до...`},
  {label: `Куплю`, categories: [`ЭЛЕКТРОНИКА`], src: `/img/item08.jpg`, srcset: `/img/item08@2x.jpg 2x`, title: `Фотик Canon`, price: `32 000`, description: `Куплю вот такую итальянскую кофеварку, можно любой фирмы...`},
];

const comments = [
  {author: `Александр Бурый`, src: `/img/avatar03.jpg`, srcset: `/img/avatar03@2x.jpg 2x`, comment: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`},
  {author: `Анатолий Хакимов`, src: `/img/avatar04.jpg`, srcset: `/img/avatar04@2x.jpg 2x`, comment: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`},
  {author: `Георгий Шпиц`, src: `/img/avatar02.jpg`, srcset: `/img/avatar02@2x.jpg 2x`, comment: `Что это за рухлядь? Стыдно такое даже фотографировать, продавать.`},
];

module.exports = {
  categories,
  tickets,
  popularTickers,
  comments,
};

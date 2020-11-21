'use strict';

const axios = require(`axios`);

const port = process.env.API_PORT || 3000;
const baseUrl = `http://localhost:${port}/api/`;

const categoiresService = {
  getCategories: () => axios.get(`${baseUrl}categories`).then((res) => res.data),
};

const searchService = {
  searchOffers: (query) => axios.get(`${baseUrl}search`, {params: query}).then((res) => res.data),
};

const offersService = {
  getOffers: () => axios.get(`${baseUrl}offers`).then((res) => res.data),
  getOfferById: (id) => axios.get(`${baseUrl}offers/${id}`).then((res) => res.data),
  getOfferComments: (id) => axios.get(`${baseUrl}offers/${id}/comments`).then((res) => res.data),

  createOffer: (offer) => axios.post(`${baseUrl}offers`, offer),
  createOfferComment: (id, data) => axios.post(`${baseUrl}offers/${id}/comments`, data),

  updateOffer: (id, data) => axios.put(`${baseUrl}offers/${id}`, data),

  deleteOffer: (id) => axios.delete(`${baseUrl}offers/${id}`),
  deleteOfferComment: (offerId, commentId) => axios.delete(`${baseUrl}offers/${offerId}/comments/${commentId}`),
};

module.exports = {
  categoiresService,
  searchService,
  offersService,
};

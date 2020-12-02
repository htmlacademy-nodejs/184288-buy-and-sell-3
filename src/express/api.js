'use strict';

const axios = require(`axios`);

const port = process.env.API_PORT || 3000;
const TIMEOUT = 1000;
const defaultUrl = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getOffers() {
    return this._load(`/offers`);
  }

  getOfferById(id) {
    return this._load(`/offers/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async getCategories() {
    return this._load(`/categories`);
  }

  async createOffer(data) {
    return this._load(`/offers`, {
      method: `POST`,
      data
    });
  }

  async createOfferComment(id, data) {
    return this._load(`/offers/${id}/comment`, {
      method: `POST`,
      data
    });
  }

  async updateOffer(id, data) {
    return this._load(`/offers/${id}`, {
      method: `PUT`,
      data
    });
  }

  async deleteOffer(id) {
    return this._load(`/offers/${id}`, {
      method: `DELETE`
    });
  }

  async deleteOfferComment(offerId, commentId) {
    return this._load(`/offers/${offerId}/comments/${commentId}`, {
      method: `DELETE`
    });
  }

  async searchOffers(query) {
    return this._load(`/search`, {params: {query}});
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};

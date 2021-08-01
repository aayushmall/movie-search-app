const fetch = require('node-fetch');
const { BASE_URL, API_KEY } = require('../constants');

const { URL, URLSearchParams } = require('url');

const getMovieListUrl = () => {
  return new URL(BASE_URL);
};

const setMovieApiParams = (page, keyword) => {
  const params = new URLSearchParams();
  params.append('apikey', API_KEY);
  params.append('page', page);
  params.append('s', keyword);

  return params;
}

const sendRequest = async (url, options = {}) => {
  options.headers = {
    'Content-Type': 'application/json'
  };
  const response = await fetch(url, options);

  return response;
};


module.exports = {
  sendRequest,
  getMovieListUrl,
  setMovieApiParams
};
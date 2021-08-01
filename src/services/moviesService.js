const ApiHelper = require('../helpers/apiHelper');
const CacheHelper = require('../helpers/cacheHelper');
const { REDIS_EXPIRY } = require('../constants');

const getMoviesListWithKeyword = async (keyword) => {
  let results = {};

  try {
    const cachedData = await CacheHelper.getAsync(keyword);

    if (cachedData) {
      results.movies = JSON.parse(cachedData);
    }

    if (!results.movies) {
      const res = await Promise.all([getMoviesListFromOmdb(keyword, 1), getMoviesListFromOmdb(keyword, 2)]);

      if (res[0].Error) {
        return res[0];
      }
  
      results.movies = [...res[0].movies, ...res[1].movies];
  
      await CacheHelper.setAsync(keyword, JSON.stringify(results.movies));
      await CacheHelper.expireAsync(keyword, REDIS_EXPIRY); 
    }
  } catch (error) {
    console.error(error);
  }

  return results;
};

const getMoviesListFromOmdb = async (keyword, page) => {
  let results = {};
  const url = ApiHelper.getMovieListUrl();
  url.search = ApiHelper.setMovieApiParams(page, keyword);

  const response = await ApiHelper.sendRequest(url);

  if (response.status === 200) {
    const data = await response.json();

    if (data.Response === 'True') {
      results.movies = data.Search;
    } else {
      results = data;
    }
  } else if (response.status === 401) {
    results.Error = 'API service Token Not valid';
  } else {
    results.Error = 'Failure in Movies Search API call';
  }

  return results;
}

module.exports = {
  getMoviesListWithKeyword
};
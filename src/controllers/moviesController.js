const { ValidationError } = require('../utils/errUtil');
const moviesService = require('../services/moviesService');

const search = async (req, res, next) => {

  if (!req.query.keyword) {
    return next(new ValidationError("Movie Search Keyword Not Found"));
  }

  const keyword = req.query.keyword.trim();

  const results = await moviesService.getMoviesListWithKeyword(keyword);

  return res.status(200).send(results);
};

module.exports = {
  search
};
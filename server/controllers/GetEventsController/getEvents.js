'use strict';

const getEvents = require('../../utils/getEvents');

module.exports = (req, res, next) => {
  getEvents({ query: req.query })
    .then(response => {
      req.responseData = {
        statusCode: 200,
        body: { data: response }
      };
      return next();
    })
    .catch(err => {
      req.responseData = {
        statusCode: err.statusCode || 404,
        body: { error: err.message || err }
      };
      return next();
    });
};

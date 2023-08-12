'use strict';

const checkInBooth = require('../../utils/checkInBooth');

module.exports = (req, res, next) => {
  checkInBooth({ body: req.body })
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

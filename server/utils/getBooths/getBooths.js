'use strict';

const BoothsModel = require('../../models').BoothsModel;

module.exports = ({ query }) => {
  return new Promise((resolve, reject) => {
    BoothsModel.findOne({
      booth_name: query.booth
    }).exec((error, booth) => {
      if (error) {
        reject('QueryError: Unable to fetch booths data');
      } else if (booth === null) {
        reject('QueryError: No booth found with booth key');
      } else {
        resolve(booth);
      }
    });
  });
};

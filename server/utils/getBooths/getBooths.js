'use strict';

const BoothsModel = require('../../models').BoothsModel;

module.exports = ({ query }) => {
  return new Promise((resolve, reject) => {
    BoothsModel.aggregate([
      { $match: { event_name: query.event, booth_name: query.booth } },
      { $limit: 1 },
      { $addFields: { booth_id: '$_id' } },
      { $unset: '_id' }
    ]).exec((error, booth) => {
      if (error) {
        reject('QueryError: Unable to fetch booths data');
      } else if (booth.length == 0) {
        reject('QueryError: No booth found with event name and booth name');
      } else {
        resolve(booth[0]);
      }
    });
  });
};

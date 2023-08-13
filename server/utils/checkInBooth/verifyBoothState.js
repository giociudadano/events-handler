'use strict';

const BoothsModel = require('../../models').BoothsModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    BoothsModel.aggregate([
      { $match: { event_name: body.event_name, booth_name: body.booth_name } },
      { $limit: 1 },
      { $addFields: { booth_id: '$_id' } },
      { $unset: '_id' }
    ]).exec((error, booth) => {
      if (error) {
        reject('QueryError: Unable to fetch booths data');
      } else if (booth.length == 0) {
        reject('QueryError: No booth found with event name and booth name');
      } else if (booth[0].booth_limit <= 0) {
        reject('AuthError: Booth limit has been reached');
      } else {
        resolve();
      }
    });
  });
};

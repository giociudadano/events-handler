'use strict';

const BoothsModel = require('../../models').BoothsModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    BoothsModel.updateOne(
      {
        event_name: body.event_name,
        booth_name: body.booth_name
      },
      { $inc: { booth_limit: -1 } },
      error => {
        if (error) {
          reject('UpdateError: Unable to update booth limit');
        }
        resolve();
      }
    );
  });
};

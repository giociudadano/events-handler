'use strict';

const CheckInBoothModel = require('../../models').CheckInBoothModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    CheckInBoothModel.aggregate([
      {
        $match: {
          user_id: body.user_id,
          event_name: body.event_name,
          booth_name: body.booth_name
        }
      },
      { $limit: 1 }
    ]).exec((error, response) => {
      if (error) {
        reject('QueryError: Unable to fetch booth check-in data');
      } else if (response.length != 0) {
        reject('QueryError: User has already checked in to this booth');
      } else {
        CheckInBoothModel.create(body, error => {
          if (error) {
            reject('UploadError: Unable to upload check-in data');
          }
          resolve(body);
        });
      }
    });
  });
};

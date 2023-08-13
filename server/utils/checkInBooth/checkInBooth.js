'use strict';

const CheckInBoothModel = require('../../models').CheckInBoothModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    CheckInBoothModel.create(body, error => {
      if (error) {
        reject('UploadError: Unable to upload check-in data');
      }
      resolve(body);
    });
  });
};

'use strict';

const mongoose = require('mongoose');
const UsersModel = require('../../models').UsersModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    UsersModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(`${body.user_id}`)
        }
      },
      { $limit: 1 }
    ]).exec((error, response) => {
      if (error) {
        reject('QueryError: Unable to fetch user data');
      } else if (response.length == 0) {
        reject('QueryError: No user was found with user id');
      } else {
        resolve();
      }
    });
  });
};

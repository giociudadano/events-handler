'use strict';

const mongoose = require('mongoose');
const UsersModel = require('../../models').UsersModel;
const CheckInBoothModel = require('../../models').CheckInBoothModel;

module.exports = ({ body }) => {
  return new Promise((resolve, reject) => {
    UsersModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(`${body.user_id}`)
        }
      },
      { $limit: 1 }
    ]).exec((error, userResponse) => {
      if (error) {
        reject('QueryError: Unable to fetch user data');
      } else if (userResponse.length == 0) {
        reject('QueryError: No user was found with user id');
      } else {
        CheckInBoothModel.aggregate([
          {
            $match: {
              user_id: body.user_id,
              event_name: body.event_name,
              booth_name: body.booth_name
            }
          },
          { $limit: 1 }
        ]).exec((error, checkInResponse) => {
          if (error) {
            reject('QueryError: Unable to fetch booth check-in data');
          } else if (checkInResponse.length == 0) {
            reject('QueryError: User has not checked in to this booth');
          } else {
            resolve({
              user_name: userResponse[0].name,
              event_name: body.event_name,
              booth_name: body.booth_name,
              transaction_id: checkInResponse[0]._id
            });
          }
        });
      }
    });
  });
};

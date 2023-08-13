'use strict';

const verifyBoothState = require('./verifyBoothState');
const verifyUserState = require('./verifyUserState');
const verifyCheckInState = require('./verifyCheckInState');
const decrementBoothLimit = require('./decrementBoothLimit');
const checkInBooth = require('./checkInBooth');
const generateResponse = require('./generateResponse');

module.exports = async ({ body }) => {
  return Promise.resolve(
    Promise.all([
      verifyBoothState({ body }),
      verifyUserState({ body }),
      verifyCheckInState({ body })
    ])
  ).then(() => {
    decrementBoothLimit({ body });
    checkInBooth({ body });
    return generateResponse({ body });
  });

  // Verify if booth is available
  // Verify if user has not already checked in
  // Decrement booth count by one
  // Create a new document
  // Fetch user details and form response
  // return await checkInBooth({ body });
};

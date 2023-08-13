'use strict';

const verifyBoothState = require('./verifyBoothState');
//const checkInBooth = require('./checkInBooth');

module.exports = async ({ body }) => {
  try {
    await verifyBoothState({ body });
  } catch (error) {
    return error;
  }

  // Verify if booth is available
  // Verify if user has not already checked in
  // Decrement booth count by one
  // Create a new document
  // Fetch user details and form response
  // return await checkInBooth({ body });
};

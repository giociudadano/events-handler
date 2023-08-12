'use strict';
const checkInBooth = require('./checkInBooth');
module.exports = async ({ body }) => {
  return await checkInBooth({ body });
};

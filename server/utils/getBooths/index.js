'use strict';

const getBooths = require('./getBooths');

module.exports = async ({ query }) => {
  if (!query.event) {
    throw Error(
      'KeyRequiredError: No event key found when attempting to query for list of events'
    );
  } else if (!query.booth) {
    throw Error(
      'KeyRequiredError: No booth key found when attempting to query for list of booths'
    );
  } else {
    return await getBooths({ query });
  }
};

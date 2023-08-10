'use strict';

// eslint-disable-next-line
const getEvents = require('./getEvents');

// eslint-disable-next-line
module.exports = async ({ query }) => {
  if (query.event) {
    return await getEvents({ query });
  } else {
    throw Error(
      'KeyRequiredError: No event key found when attempting to query for list of events'
    );
  }
};

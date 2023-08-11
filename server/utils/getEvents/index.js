'use strict';

const getEvents = require('./getEvents');

module.exports = async ({ query }) => {
  if (!query.event) {
    throw Error(
      'KeyRequiredError: No event key found when attempting to query for list of events'
    );
  } else {
    return await getEvents({ query });
  }
};

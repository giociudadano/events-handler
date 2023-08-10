'use strict';

const EventsModel = require('../../models').EventsModel;

module.exports = ({ query }) => {
  return new Promise(resolve => {
    const response = EventsModel.find({
      event_name: query.event
    }).exec();

    if (!response.data) {
      throw Error('QueryError: No event found from event key');
    } else {
      resolve(response);
    }
  });
};

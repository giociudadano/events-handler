'use strict';

const EventsModel = require('../../models').EventsModel;

module.exports = ({ query }) => {
  return new Promise((resolve, reject) => {
    EventsModel.findOne({
      event_name: query.event
    }).exec((error, event) => {
      if (error) {
        reject('QueryError: Unable to fetch events data');
      } else if (event === null) {
        reject('QueryError: No event found with event key');
      } else {
        resolve(event);
      }
    });
  });
};

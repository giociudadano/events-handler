'use strict';

const EventsModel = require('../../models').EventsModel;

module.exports = ({ query }) => {
  return new Promise((resolve, reject) => {
    EventsModel.aggregate([
      { $match: { event_name: query.event } },
      { $limit: 1 },
      { $addFields: { event_id: '$_id' } },
      { $unset: '_id' }
    ]).exec((error, event) => {
      if (error) {
        reject('QueryError: Unable to fetch events data');
      } else if (event.length == 0) {
        reject('QueryError: No event found with event name');
      } else {
        resolve(event[0]);
      }
    });
  });
};

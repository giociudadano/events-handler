'use strict';

// eslint-disable-next-line
const getEvents = require('./getEvents');

// eslint-disable-next-line
module.exports = async ({ query }) => {
  return {
    event_name: 'Game Developers Summit 2023',
    event_background: {
      desktop: 'gamedev-desktop.jpg',
      mobile: 'gamedev-mobile.jpg'
    },
    booths: [
      'Game Engines',
      'Monetization Practices',
      'Music in Games',
      'Collaborative Development',
      'Games as a Service'
    ]
  };
};

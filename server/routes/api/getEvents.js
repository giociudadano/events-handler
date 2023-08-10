'use strict';
const GetEventsController = require('../../controllers/GetEventsController');

module.exports = router => {
  router.get('/getEvents', GetEventsController.getEvents);
};

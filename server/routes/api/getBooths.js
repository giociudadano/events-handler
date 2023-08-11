'use strict';
const GetBoothsController = require('../../controllers/GetBoothsController');

module.exports = router => {
  router.get('/getBooths', GetBoothsController.getBooths);
};

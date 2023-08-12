'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const CheckInBoothController = require('../../controllers/CheckInBoothController');

module.exports = router => {
  router.post('/checkInBooth', jsonParser, CheckInBoothController.checkInBooth);
};

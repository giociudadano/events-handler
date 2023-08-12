'use strict';
const CheckInBoothController = require('../../controllers/CheckInBoothController');

module.exports = router => {
  router.post('/checkInBooth', CheckInBoothController.checkInBooth);
};

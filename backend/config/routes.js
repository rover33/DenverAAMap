const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/meetings')
    .get(mainController.getMeetings);

router.route('/update')
    .get(mainController.updateMeetings);


module.exports = router;
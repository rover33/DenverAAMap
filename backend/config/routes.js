const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/meeting123?*')
    .get(mainController.getMeetings);

router.route('/meetings')
    .get(mainController.getMeetingsTest);

router.route('/update')
    .get(mainController.updateMeetings);


module.exports = router;
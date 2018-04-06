const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/meeting?*')
    .get(mainController.getMeetings);

module.exports = router;
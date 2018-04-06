const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/meeting123?*')
    .get(mainController.getMeetings);

module.exports = router;
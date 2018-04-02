const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/meetings')
    .get(mainController.getMeetings);


module.exports = router;
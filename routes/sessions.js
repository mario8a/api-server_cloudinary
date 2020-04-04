const express = require('express');
const router = express.Router();

const sessionsControllers = require('../controllers/SessionControllers');

/* GET users listing. */
router.route('/')
      .post(sessionsControllers.authenticate,
            sessionsControllers.generateToken,
            sessionsControllers.sendToken)

module.exports = router;

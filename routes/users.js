const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/UsersControllers');
const sessionsControllers = require('../controllers/SessionControllers');

/* GET users listing. */
router.route('/')
      .post(usersControllers.create,
            sessionsControllers.generateToken,
            sessionsControllers.sendToken)
      // .get(usersControllers.destroyAll);

module.exports = router;

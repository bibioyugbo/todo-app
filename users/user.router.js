const express = require('express');
const router = express.Router();
const { CreateUserController } = require('./user.controller');

router.post('/', CreateUserController)


module.exports = router;
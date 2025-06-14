const express = require('express');
const router = express.Router();
const {createTaskController} = require('./task.controller');



router.post('/', createTaskController)

module.exports = router;
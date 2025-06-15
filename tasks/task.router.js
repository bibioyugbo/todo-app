const express = require('express');
const router = express.Router();
const {createTaskController, updateTaskController, getTasksController} = require('./task.controller');
const {authenticateUser} = require('../auth/auth.middleware');



router.post('/', authenticateUser, createTaskController)
router.put('/:id',authenticateUser, updateTaskController);
router.get('/',authenticateUser, getTasksController);;

module.exports = router;
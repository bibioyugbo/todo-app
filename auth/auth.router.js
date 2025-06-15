const express = require('express');
const router = express.Router();

const {signup, login} = require('./auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

module.exports = router;
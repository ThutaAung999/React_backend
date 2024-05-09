var express = require('express');
var router = express.Router();
var users = require('./../controllers/UsersController');

router.get('/:userId', users.getUserById);
router.post('/', users.registerUser);
router.post('/login', users.login);
module.exports = router;

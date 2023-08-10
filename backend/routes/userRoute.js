const express = require('express');
const router = express.Router();
const  { newUser, userLogin, deleteUser } = require('../controller/userController');

router.post('/login', userLogin);
router.post('/create-account', newUser);
router.delete('/delete', deleteUser);

module.exports = router;
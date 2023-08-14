const express = require("express");
const router = express.Router();
const {
  newUser,
  userLogin,
  deleteUser,
} = require("../controller/userController");
const { handleRefreshToken } = require('../controller/refreshToken');

router.post("/login", userLogin);
router.post("/create-account", newUser);
router.delete("/delete", deleteUser);
router.get('/refresh', handleRefreshToken);

module.exports = router;

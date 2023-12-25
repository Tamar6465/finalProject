const express = require("express");
const Joi = require("joi");
const { register, login } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
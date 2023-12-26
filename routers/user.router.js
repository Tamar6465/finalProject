const express = require("express");
const { register, login,getUser,getUsers } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUser/:id", getUser);
router.get("/getUsers", getUsers);

module.exports = router;
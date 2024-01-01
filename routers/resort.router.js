const express = require("express");
const { getAllResort,getResortByCity,getResortByDisabled,addResort,updateResort,deleteResort, getbyPrice } = require("../controllers/resort.controller");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/getAll",auth(), getAllResort);
router.get("/getByCity/:city",auth(), getResortByCity);
router.get("/getByDisabled/:disable",auth(), getResortByDisabled);
router.get("/getResortByPrice",auth(),getbyPrice)
router.post("/addResort", auth(),addResort);
router.put("/updateResort/:id",auth(),updateResort);
router.delete("/deleteResort/:id",auth(),deleteResort)

module.exports = router;
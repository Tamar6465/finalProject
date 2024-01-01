const express = require("express");
const { getAllResort,getResortByCity,getResortByDisabled,addResort,updateResort,deleteResort, getbyPrice } = require("../controllers/resort.controller");
const router = express.Router();

router.get("/getAll", getAllResort);
router.get("/getByCity/:city", getResortByCity);
router.get("/getByDisabled/:disable", getResortByDisabled);
router.get("/getResortByPrice",getbyPrice)
router.post("/addResort", addResort);
router.put("/updateResort/:id",updateResort);
router.delete("/deleteResort/:id",deleteResort)

module.exports = router;
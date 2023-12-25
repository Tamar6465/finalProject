const express = require("express");
const { getAllResort,getResortByCity,getResortByDisabled,addResort,updateResort,deleteResort } = require("../controllers/resort.controller");
const router = express.Router();

router.get("/getAll", getAllResort);
router.get("/getByCity/:city", getResortByCity);
router.get("/getByDisabled/:disabled", getResortByDisabled);
router.post("/addResort", addResort);
router.put("/updateResort/:id",updateResort);
router.delete("/deleteResort/:id",deleteResort)

module.exports = router;
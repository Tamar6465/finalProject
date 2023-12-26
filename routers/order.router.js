const express = require("express");
const { addOrder, updateOrder, deleteOrder, getAll, getOrder } = require("../controllers/order.controller");
const router = express.Router();

router.post("/addOrder", addOrder);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);
router.get("/getAll", getAll);
router.get("/getOrder/:id", getOrder);


module.exports = router;
const express = require("express");

const itemController = require("../controllers/item");

const router = express.Router();

router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemDetails);

module.exports = router;

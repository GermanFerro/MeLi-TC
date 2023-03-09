const express = require("express");

const { getItems, getItemDetails } = require("../controllers/item");

const router = express.Router();

// api/items
router.get("/", getItems);
router.get("/:id", getItemDetails);

module.exports = router;

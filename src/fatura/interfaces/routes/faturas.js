var express = require("express");
const FaturaController = require("../controller/fatura.controller");
var router = express.Router();
const upload = require("../middleware/upload");

router.post(
  "/extract-fatura-data",
  upload.array("files"),
  FaturaController.extractFaturaData
);

module.exports = router;

var express = require("express");
const FaturaController = require("../controller/fatura.controller");
var router = express.Router();
const upload = require("../middleware/upload");

router.post(
  "/extract-fatura-data",
  upload.array("files"),
  FaturaController.extractFaturaData
);

router.get("/", FaturaController.getAll);
router.get("/byId/:id", FaturaController.getById);
router.get("/byCliente/:numeroCliente", FaturaController.getAllByNumeroCliente);
router.get("/filter/:numeroCliente", FaturaController.filterByNumeroCliente);

module.exports = router;

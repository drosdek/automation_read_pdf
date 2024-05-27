var express = require("express");
const FaturaController = require("../controller/fatura.controller");
var router = express.Router();
const upload = require("../middleware/upload");

router.post(
  "/extract-fatura-data",
  upload.array("files"),
  FaturaController.extractFaturaData
);

router.get("/fatura/:id", FaturaController.getById);
router.get("/faturas/:numeroCliente", FaturaController.getAllByNumeroCliente);
router.get(
  "/faturas/filter/:numeroCliente",
  FaturaController.filterByNumeroCliente
);

module.exports = router;

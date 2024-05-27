const ExtractFaturaDataUseCase = require("../../application/extractFaturaData.useCase");
const path = require("path");
const fs = require("fs");

class FaturaController {
  static async extractFaturaData(req, res, next) {
    if (!req.files || req.files.length === 0) {
      return next("Nenhum arquivo enviado");
    }
    try {
      const faturas = [];
      for (const file of req.files) {
        const pdfPath = path.resolve(file.path);
        const fatura = await ExtractFaturaDataUseCase.execute(pdfPath);
        faturas.push(fatura);
        fs.unlinkSync(pdfPath);
      }
      res.json(faturas);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FaturaController;

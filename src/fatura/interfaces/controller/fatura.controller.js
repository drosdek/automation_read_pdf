const ExtractFaturaDataUseCase = require("../../application/extractFaturaData.useCase");
const path = require("path");
const fs = require("fs");
const FaturaRepository = require("../../infra/repositories/fatura.repository");

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

  static async getById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const fatura = await FaturaRepository.getById(id);
      if (!fatura) {
        return res.status(404).json({ message: "Fatura não encontrada" });
      }
      res.json(fatura);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByNumeroCliente(req, res, next) {
    try {
      const numeroCliente = req.params.numeroCliente;
      const faturas = await FaturaRepository.getAllByNumeroCliente(
        numeroCliente
      );
      res.json(faturas);
    } catch (error) {
      next(error);
    }
  }

  static async filterByNumeroCliente(req, res, next) {
    try {
      const numeroCliente = req.params.numeroCliente;
      const filter = req.query;
      const faturas = await FaturaRepository.filterByNumeroCliente(
        numeroCliente,
        filter
      );
      res.json(faturas);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FaturaController;

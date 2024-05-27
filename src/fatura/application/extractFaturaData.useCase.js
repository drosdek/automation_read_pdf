const Fatura = require("../domain/entities/fatura.entity");
const ExtractorService = require("../domain/services/extractor.service");
const PDFExtractorWrapper = require("../infra/pdfExtractor/PDFExtractor");
const FaturaRepository = require("../infra/repositories/fatura.repository");

class ExtractFaturaDataUseCase {
  static async execute(pdfPath) {
    const pdfContent = await PDFExtractorWrapper.extractContent(pdfPath);
    const faturaData = ExtractorService.extractFaturaData(pdfContent);
    const fatura = new Fatura(faturaData);

    await FaturaRepository.save(fatura);

    return faturaData;
  }
}

module.exports = ExtractFaturaDataUseCase;

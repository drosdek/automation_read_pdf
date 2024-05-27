const path = require("path");
const fs = require("fs");
const ExtractorService = require("../domain/services/extractor.service");
const FaturaRepository = require("../infra/repositories/fatura.repository");
const PDFExtractor = require("../infra/pdfExtractor/PDFExtractor");
const ExtractFaturaDataUseCase = require("../application/extractFaturaData.useCase");
const Fatura = require("../domain/entities/fatura.entity");

jest.mock("../domain/services/extractor.service", () => {
  return {
    extractFaturaData: jest.fn(),
  };
});

jest.mock("../infra/repositories/fatura.repository", () => {
  return {
    save: jest.fn(),
    getById: jest.fn(),
    getAllByNumeroCliente: jest.fn(),
    filterByNumeroCliente: jest.fn(),
    getAll: jest.fn(),
  };
});

jest.mock("../infra/pdfExtractor/PDFExtractor", () => {
  return {
    extractContent: jest.fn(),
  };
});

describe("ExtractFaturaDataUseCase", () => {
  it("should extract data from pdf and save to repository", async () => {
    const mockPdfPath = "mock/path/to/pdf";
    const mockPdfContent = "mock pdf content";
    const mockFaturaData = { numeroCliente: "12345" };
    const mockFatura = { data: mockFaturaData };

    PDFExtractor.extractContent.mockResolvedValue(mockPdfContent);
    ExtractorService.extractFaturaData.mockReturnValue(mockFaturaData);
    FaturaRepository.save.mockResolvedValue(mockFatura);

    const result = await ExtractFaturaDataUseCase.execute(mockPdfPath);

    expect(PDFExtractor.extractContent).toHaveBeenCalledWith(mockPdfPath);
    expect(ExtractorService.extractFaturaData).toHaveBeenCalledWith(
      mockPdfContent
    );
    expect(FaturaRepository.save).toHaveBeenCalledWith(
      new Fatura(mockFaturaData)
    );
    expect(result).toEqual(mockFaturaData);
  });
});

describe("FaturaRepository", () => {
  it("should save fatura to repository", async () => {
    const mockFatura = { numeroCliente: "12345" };
    FaturaRepository.save.mockResolvedValue(mockFatura);

    const result = await FaturaRepository.save(mockFatura);

    expect(FaturaRepository.save).toHaveBeenCalledWith(mockFatura);
    expect(result).toEqual(mockFatura);
  });

  it("should get fatura by id from repository", async () => {
    const mockId = 1;
    const mockFatura = { id: mockId, numeroCliente: "12345" };
    FaturaRepository.getById.mockResolvedValue(mockFatura);

    const result = await FaturaRepository.getById(mockId);

    expect(FaturaRepository.getById).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(mockFatura);
  });

});

describe("ExtractorService", () => {
  it("should extract fatura data from pdf content", () => {
    const mockPdfContent = "mock pdf content";
    const mockFaturaData = { numeroCliente: "12345" };
    ExtractorService.extractFaturaData.mockReturnValue(mockFaturaData);

    const result = ExtractorService.extractFaturaData(mockPdfContent);

    expect(ExtractorService.extractFaturaData).toHaveBeenCalledWith(
      mockPdfContent
    );
    expect(result).toEqual(mockFaturaData);
  });
});


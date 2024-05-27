class ExtractorService {
  static extractFaturaData(pdfContent) {
    const lines = pdfContent.split("\n");
    const faturaData = {};
    const dadosTradados = {};
    const titlesArray = [
      "Nº DO CLIENTE",
      "Nº DA INSTALAÇÃO",
      "Referente a",
      "Vencimento",
      "Valor a pagar (R$)",
      "Itens da Fatura",
    ];

    const lineTitles = [
      "Energia Elétrica",
      "Energia SCEE ISENTA",
      "Energia compensada GD I",
      "Contrib Ilum Publica Municipal",
      "Energia SCEE s/ ICMS",
      "Energia injetada HFP",
      "En comp. s/ ICMS",
    ];

    function findAndGroup(titlesArray) {
      titlesArray.forEach((title) => {
        let titleLineIndex = lines.findIndex((line) => line.includes(title));
        if (titleLineIndex !== -1) {
          let titles = lines[titleLineIndex].split(/\s{2,}/);
          let values = lines[titleLineIndex + 1].split(/\s{2,}/);
          titles = titles.map((title) => title.trim());
          values = values.map((value) => value.trim());
          for (let i = 0; i < titles.length; i++) {
            faturaData[titles[i]] = values[i];
          }
        }
      });
    }

    findAndGroup(titlesArray);

    function findAndExtract(lineTitle) {
      let lineIndex = lines.findIndex((line) => line.includes(lineTitle));
      if (lineIndex !== -1) {
        let values = lines[lineIndex].split(/\s{2,}/);
        values = values.map((value) => value.trim().split(/\s+/)).flat();
        faturaData[lineTitle] = values.slice(1);
      }
    }

    lineTitles.forEach((title) => findAndExtract(title));

    if (faturaData) {
      if (faturaData["Nº DO CLIENTE"])
        dadosTradados.numeroCliente = faturaData["Nº DO CLIENTE"];

      if (faturaData["Nº DA INSTALAÇÃO"])
        dadosTradados.numeroInstalacao = faturaData["Nº DA INSTALAÇÃO"];

      if (faturaData["Referente a"])
        dadosTradados.mesReferencia = faturaData["Referente a"];

      if (faturaData["Vencimento"])
        dadosTradados.vencimento = new Date(faturaData["Vencimento"]);

      if (faturaData["Valor a pagar (R$)"])
        dadosTradados.valorPagar = faturaData["Valor a pagar (R$)"];

      if (faturaData["Energia Elétrica"]) {
        dadosTradados.energiaEletricaQuantidade =
          faturaData["Energia Elétrica"][1];
        dadosTradados.energiaEletricaValor = faturaData["Energia Elétrica"][3];
      }
      if (faturaData["Energia SCEE s/ ICMS"]) {
        dadosTradados.energiaEletricaSCEESemICMSQuantidade =
          faturaData["Energia SCEE s/ ICMS"][3];
        dadosTradados.energiaEletricaSCEESemICMSValor =
          faturaData["Energia SCEE s/ ICMS"][5];
      }
      if (faturaData["Energia compensada GD I"]) {
        dadosTradados.energiaCompensadaGDIQuantidade =
          faturaData["Energia compensada GD I"][3];
        dadosTradados.energiaCompensadaGDIValor =
          faturaData["Energia compensada GD I"][5];
      }
      if (faturaData["Contrib Ilum Publica Municipal"]) {
        dadosTradados.contribIlumPublicaMunicipalValor =
          faturaData["Contrib Ilum Publica Municipal"][3];
      }
      if (faturaData["Energia injetada HFP"]) {
        dadosTradados.energiaInjetadaHFPQuantidade =
          faturaData["Energia injetada HFP"][2];
        dadosTradados.energiaInjetadaHFPValor =
          faturaData["Energia injetada HFP"][4];
      }
      if (faturaData["En comp. s/ ICMS"]) {
        dadosTradados.energiaCompSemICMSQuantidade =
          faturaData["En comp. s/ ICMS"][3];
        dadosTradados.energiaCompSemICMSValor =
          faturaData["En comp. s/ ICMS"][5];
      }
    }

    return dadosTradados;
  }
}

module.exports = ExtractorService;

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
        var [day, month, year] = faturaData["Vencimento"].split("/");
      dadosTradados.vencimento = new Date(`${year}-${month}-${day}`);

      if (faturaData["Valor a pagar (R$)"])
        dadosTradados.valorPagar = parseFloat(
          faturaData["Valor a pagar (R$)"].replace(",", ".")
        );

      if (faturaData["Energia Elétrica"]) {
        dadosTradados.energiaEletricaQuantidade = parseFloat(
          faturaData["Energia Elétrica"][1].replace(",", ".")
        );
        dadosTradados.energiaEletricaValor = parseFloat(
          faturaData["Energia Elétrica"][3].replace(",", ".")
        );
      }
      if (faturaData["Energia SCEE s/ ICMS"]) {
        dadosTradados.energiaEletricaSCEESemICMSQuantidade = parseFloat(
          faturaData["Energia SCEE s/ ICMS"][3].replace(",", ".")
        );
        dadosTradados.energiaEletricaSCEESemICMSValor = parseFloat(
          faturaData["Energia SCEE s/ ICMS"][5].replace(",", ".")
        );
      }
      if (faturaData["Energia compensada GD I"]) {
        dadosTradados.energiaCompensadaGDIQuantidade = parseFloat(
          faturaData["Energia compensada GD I"][3].replace(",", ".")
        );
        dadosTradados.energiaCompensadaGDIValor = parseFloat(
          faturaData["Energia compensada GD I"][5].replace(",", ".")
        );
      }
      if (faturaData["Contrib Ilum Publica Municipal"]) {
        dadosTradados.contribIlumPublicaMunicipalValor = parseFloat(
          faturaData["Contrib Ilum Publica Municipal"][3].replace(",", ".")
        );
      }
      if (faturaData["Energia injetada HFP"]) {
        dadosTradados.energiaInjetadaHFPQuantidade = parseFloat(
          faturaData["Energia injetada HFP"][2].replace(",", ".")
        );
        dadosTradados.energiaInjetadaHFPValor = parseFloat(
          faturaData["Energia injetada HFP"][4].replace(",", ".")
        );
      }
      if (faturaData["Energia SCEE ISENTA"]) {
        dadosTradados.energiaEletricaSCEEIsentaQuantidade = parseFloat(
          faturaData["Energia SCEE ISENTA"][2].replace(",", ".")
        );
        dadosTradados.energiaEletricaSCEEIsentaValor = parseFloat(
          faturaData["Energia SCEE ISENTA"][4].replace(",", ".")
        );
      }
      if (faturaData["En comp. s/ ICMS"]) {
        dadosTradados.energiaCompSemICMSQuantidade = parseFloat(
          faturaData["En comp. s/ ICMS"][3].replace(",", ".")
        );
        dadosTradados.energiaCompSemICMSValor = parseFloat(
          faturaData["En comp. s/ ICMS"][5].replace(",", ".")
        );
      }
    }

    return dadosTradados;
  }
}

module.exports = ExtractorService;

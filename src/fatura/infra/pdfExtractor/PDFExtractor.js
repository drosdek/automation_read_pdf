const fs = require("fs");
const pdfParse = require("pdf-parse");

class PDFExtractor {
  static async extractContent(pdfPath) {
    return new Promise((resolve, reject) => {
      let dataBuffer = fs.readFileSync(pdfPath);

      pdfParse(dataBuffer).then(function(data) {
        resolve(data.text);
      }).catch(function(error){
        reject(error);
      });
    });
  }
}

module.exports = PDFExtractor;

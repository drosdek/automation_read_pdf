  class Fatura {
    constructor({
      id,
      numeroCliente,
      numeroInstalacao,
      mesReferencia,
      energiaEletricaQuantidade,
      energiaEletricaValor,
      energiaEletricaSCEESemICMSQuantidade,
      energiaEletricaSCEESemICMSValor,
      energiaEletricaSCEEIsentaQuantidade,
      energiaEletricaSCEEIsentaValor,
      energiaCompensadaGDIQuantidade,
      energiaCompensadaGDIValor,
      contribIlumPublicaMunicipalValor,
      energiaInjetadaHFPQuantidade,
      energiaInjetadaHFPValor,
      energiaCompSemICMSQuantidade,
      energiaCompSemICMSValor,
      vencimento,
      valorPagar,
      createdAt,
    }) {
      this.id = id;
      this.numeroCliente = numeroCliente;
      this.numeroInstalacao = numeroInstalacao;
      this.mesReferencia = mesReferencia;
      this.vencimento = vencimento;
      this.energiaEletricaQuantidade = energiaEletricaQuantidade;
      this.energiaEletricaValor = energiaEletricaValor;
      this.energiaEletricaSCEESemICMSQuantidade =
        energiaEletricaSCEESemICMSQuantidade || null;
      this.energiaEletricaSCEESemICMSValor =
        energiaEletricaSCEESemICMSValor || null;
      this.energiaEletricaSCEEIsentaQuantidade =
        energiaEletricaSCEEIsentaQuantidade || null;
      this.energiaEletricaSCEEIsentaValor =
        energiaEletricaSCEEIsentaValor || null;
      this.energiaCompensadaGDIQuantidade =
        energiaCompensadaGDIQuantidade || null;
      this.energiaCompensadaGDIValor = energiaCompensadaGDIValor || null;
      this.contribIlumPublicaMunicipalValor = contribIlumPublicaMunicipalValor;
      this.energiaInjetadaHFPQuantidade = energiaInjetadaHFPQuantidade || null;
      this.energiaInjetadaHFPValor = energiaInjetadaHFPValor || null;
      this.energiaCompSemICMSQuantidade = energiaCompSemICMSQuantidade || null;
      this.energiaCompSemICMSValor = energiaCompSemICMSValor || null;
      this.valorPagar = valorPagar;
      this.createdAt = createdAt;
    }
  }

  module.exports = Fatura;

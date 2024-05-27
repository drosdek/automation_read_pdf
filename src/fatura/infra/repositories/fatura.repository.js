const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

class FaturaRepository {
  static async save(fatura) {
    try {
      return await prisma.faturaCemig.create({
        data: {
          numeroCliente: fatura.numeroCliente,
          cliente: fatura.cliente,
          numeroInstalacao: fatura.numeroInstalacao,
          mesReferencia: fatura.mesReferencia,
          energiaEletricaQuantidade: fatura.energiaEletricaQuantidade,
          energiaEletricaValor: fatura.energiaEletricaValor,
          energiaEletricaSCEEEQuantidade: fatura.energiaEletricaSCEEEQuantidade,
          energiaEletricaSCEEEValor: fatura.energiaEletricaSCEEEValor,
          energiaCompensadaGDIQuantidade: fatura.energiaCompensadaGDIQuantidade,
          energiaCompensadaGDIValor: fatura.energiaCompensadaGDIValor,
          contribIlumPublicaMunicipalValor:
            fatura.contribIlumPublicaMunicipalValor,
          energiaInjetadaHFPQuantidade: fatura.energiaInjetadaHFPQuantidade,
          energiaInjetadaHFPValor: fatura.energiaInjetadaHFPValor,
          energiaCompSemICMSQuantidade: fatura.energiaCompSemICMSQuantidade,
          energiaCompSemICMSValor: fatura.energiaCompSemICMSValor,
          vencimento: fatura.vencimento,
          valorPagar: fatura.valorPagar,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return err.code + err.meta.target;
      }
    }
  }

  static async getById(id) {
    return prisma.faturaCemig.findUnique({
      where: { id },
    });
  }

  static async getAllByNumeroCliente(numeroCliente) {
    return prisma.faturaCemig.findMany({
      where: { numeroCliente },
    });
  }

  static async filterByNumeroCliente(numeroCliente, filter) {
    const where = { numeroCliente };

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        where[key] = filter[key];
      }
    });

    return prisma.faturaCemig.findMany({
      where,
    });
  }
}

module.exports = FaturaRepository;

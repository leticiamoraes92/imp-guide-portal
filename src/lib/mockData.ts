export interface NCMData {
  codigo: string;
  descricao: string;
  tratamentoAdministrativo: string;
  orgaoAnuente: string;
  aliquotas: {
    ii: number;
    ipi: number;
    icms: number;
  };
  informacoesAdicionais: {
    tipo: string;
    descricao: string;
  }[];
}

export const ncmDatabase: Record<string, NCMData> = {
  "8471.30.19": {
    codigo: "8471.30.19",
    descricao: "Máquinas automáticas para processamento de dados, portáteis, de peso não superior a 10 kg, contendo pelo menos uma unidade central de processamento, um teclado e uma tela",
    tratamentoAdministrativo: "Licenciamento Automático",
    orgaoAnuente: "SECEX / DECEX",
    aliquotas: { ii: 16, ipi: 15, icms: 18 },
    informacoesAdicionais: [
      { tipo: "Exceção", descricao: "Ex 001 – Notebooks com tela superior a 15 polegadas possuem alíquota de IPI reduzida para 5%." },
      { tipo: "Observação", descricao: "Sujeito a controle de qualidade pelo INMETRO." },
      { tipo: "Acordo Comercial", descricao: "Mercosul – Alíquota preferencial de II: 0% para produtos originários." },
    ],
  },
  "0901.11.10": {
    codigo: "0901.11.10",
    descricao: "Café não torrado, não descafeinado, em grão",
    tratamentoAdministrativo: "Dispensado de Licenciamento",
    orgaoAnuente: "MAPA",
    aliquotas: { ii: 10, ipi: 0, icms: 12 },
    informacoesAdicionais: [
      { tipo: "Observação", descricao: "Necessita de certificado fitossanitário do país de origem." },
      { tipo: "Acordo Comercial", descricao: "ALADI – Preferência tarifária para países membros." },
    ],
  },
  "6204.62.00": {
    codigo: "6204.62.00",
    descricao: "Calças, jardineiras, bermudas e shorts de algodão, de uso feminino",
    tratamentoAdministrativo: "Licenciamento Não Automático",
    orgaoAnuente: "SECEX / DECEX",
    aliquotas: { ii: 35, ipi: 0, icms: 18 },
    informacoesAdicionais: [
      { tipo: "Exceção", descricao: "Produtos com composição mínima de 85% algodão orgânico certificado têm II reduzido." },
      { tipo: "Observação", descricao: "Medida antidumping vigente para origem China – Direito de US$ 5,14/kg." },
    ],
  },
  "2204.21.00": {
    codigo: "2204.21.00",
    descricao: "Vinhos de uvas frescas em recipientes de capacidade não superior a 2 litros",
    tratamentoAdministrativo: "Licenciamento Automático",
    orgaoAnuente: "MAPA",
    aliquotas: { ii: 27, ipi: 10, icms: 25 },
    informacoesAdicionais: [
      { tipo: "Observação", descricao: "Exige registro no MAPA e certificado de origem." },
      { tipo: "Acordo Comercial", descricao: "Mercosul – Alíquota preferencial de II: 20% para Argentina, Uruguai e Paraguai." },
    ],
  },
};

export function searchNCM(query: string): NCMData | null {
  // Direct match
  if (ncmDatabase[query]) return ncmDatabase[query];

  // Search by chapter (first 2 digits) or position (first 4 digits)
  const results = Object.values(ncmDatabase).find((ncm) => ncm.codigo.startsWith(query));
  return results || null;
}

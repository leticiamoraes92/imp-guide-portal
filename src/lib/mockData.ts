export interface InformacaoAdicional {
  destaque: string;
  descricaoDestaque: string;
  tratamento: string;
  excecoes: string;
  anuentes: string;
  finalidade: string;
}

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
  informacoesAdicionais: InformacaoAdicional[];
}

export const ncmDatabase: Record<string, NCMData> = {
  "8471.30.19": {
    codigo: "8471.30.19",
    descricao: "Máquinas automáticas para processamento de dados, portáteis, de peso não superior a 10 kg, contendo pelo menos uma unidade central de processamento, um teclado e uma tela",
    tratamentoAdministrativo: "Licenciamento Automático",
    orgaoAnuente: "SECEX / DECEX",
    aliquotas: { ii: 16, ipi: 15, icms: 18 },
    informacoesAdicionais: [
      { destaque: "EX-001", descricaoDestaque: "Notebooks com tela superior a 15 polegadas possuem alíquota de IPI reduzida para 5%", tratamento: "Licenciamento Automático", excecoes: "Não se aplica a tablets", anuentes: "SECEX / DECEX", finalidade: "Controle de qualidade e segurança" },
      { destaque: "OBS-001", descricaoDestaque: "Sujeito a controle de qualidade pelo INMETRO", tratamento: "Certificação Obrigatória", excecoes: "—", anuentes: "INMETRO", finalidade: "Garantia de conformidade técnica" },
      { destaque: "AC-001", descricaoDestaque: "Mercosul – Alíquota preferencial de II: 0% para produtos originários", tratamento: "Acordo Comercial", excecoes: "Necessita certificado de origem", anuentes: "SECEX", finalidade: "Preferência tarifária regional" },
    ],
  },
  "0901.11.10": {
    codigo: "0901.11.10",
    descricao: "Café não torrado, não descafeinado, em grão",
    tratamentoAdministrativo: "Dispensado de Licenciamento",
    orgaoAnuente: "MAPA",
    aliquotas: { ii: 10, ipi: 0, icms: 12 },
    informacoesAdicionais: [
      { destaque: "OBS-001", descricaoDestaque: "Necessita de certificado fitossanitário do país de origem", tratamento: "Controle Sanitário", excecoes: "—", anuentes: "MAPA", finalidade: "Proteção fitossanitária" },
      { destaque: "AC-001", descricaoDestaque: "ALADI – Preferência tarifária para países membros", tratamento: "Acordo Comercial", excecoes: "Somente para países signatários", anuentes: "SECEX", finalidade: "Preferência tarifária" },
    ],
  },
  "6204.62.00": {
    codigo: "6204.62.00",
    descricao: "Calças, jardineiras, bermudas e shorts de algodão, de uso feminino",
    tratamentoAdministrativo: "Licenciamento Não Automático",
    orgaoAnuente: "SECEX / DECEX",
    aliquotas: { ii: 35, ipi: 0, icms: 18 },
    informacoesAdicionais: [
      { destaque: "EX-001", descricaoDestaque: "Produtos com composição mínima de 85% algodão orgânico certificado têm II reduzido", tratamento: "Exceção Tarifária", excecoes: "Apenas algodão orgânico certificado", anuentes: "SECEX / DECEX", finalidade: "Incentivo ambiental" },
      { destaque: "AD-001", descricaoDestaque: "Medida antidumping vigente para origem China – Direito de US$ 5,14/kg", tratamento: "Medida de Defesa Comercial", excecoes: "—", anuentes: "SECEX / DECOM", finalidade: "Proteção da indústria nacional" },
    ],
  },
  "2204.21.00": {
    codigo: "2204.21.00",
    descricao: "Vinhos de uvas frescas em recipientes de capacidade não superior a 2 litros",
    tratamentoAdministrativo: "Licenciamento Automático",
    orgaoAnuente: "MAPA",
    aliquotas: { ii: 27, ipi: 10, icms: 25 },
    informacoesAdicionais: [
      { destaque: "OBS-001", descricaoDestaque: "Exige registro no MAPA e certificado de origem", tratamento: "Controle Sanitário", excecoes: "—", anuentes: "MAPA", finalidade: "Segurança alimentar" },
      { destaque: "AC-001", descricaoDestaque: "Mercosul – Alíquota preferencial de II: 20% para Argentina, Uruguai e Paraguai", tratamento: "Acordo Comercial", excecoes: "Necessita certificado de origem Mercosul", anuentes: "SECEX", finalidade: "Preferência tarifária regional" },
    ],
  },
};

export function searchNCM(query: string): NCMData | null {
  if (ncmDatabase[query]) return ncmDatabase[query];
  const results = Object.values(ncmDatabase).find((ncm) => ncm.codigo.startsWith(query));
  return results || null;
}

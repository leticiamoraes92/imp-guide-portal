import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Calculator, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AppHeader from "@/components/AppHeader";
import type { NCMData } from "@/lib/mockData";

const tooltips: Record<string, string> = {
  II: "Imposto de Importação aplicado sobre o valor aduaneiro",
  IPI: "Imposto sobre Produtos Industrializados",
  ICMS: "Imposto sobre circulação de mercadorias",
};

const Resultado = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<NCMData | null>(null);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("imp-guide-auth") !== "true") { navigate("/"); return; }
    const raw = localStorage.getItem("imp-guide-result");
    const v = localStorage.getItem("imp-guide-valor");
    if (!raw) { navigate("/consulta"); return; }
    setData(JSON.parse(raw));
    setValor(Number(v) || 0);
  }, [navigate]);

  if (!data) return null;

  const calcImposto = (aliquota: number) => valor > 0 ? (valor * aliquota) / 100 : 0;
  const impostos = [
    { sigla: "II", aliquota: data.aliquotas.ii, valor: calcImposto(data.aliquotas.ii) },
    { sigla: "IPI", aliquota: data.aliquotas.ipi, valor: calcImposto(data.aliquotas.ipi) },
    { sigla: "ICMS", aliquota: data.aliquotas.icms, valor: calcImposto(data.aliquotas.icms) },
  ];
  const totalAliquota = impostos.reduce((s, i) => s + i.aliquota, 0);
  const totalValor = impostos.reduce((s, i) => s + i.valor, 0);

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader showLogout />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Button variant="ghost" onClick={() => navigate("/consulta")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar à consulta
        </Button>

        {/* BLOCO 1 - Dados NCM */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Dados do NCM</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                ["Código NCM", data.codigo],
                ["Descrição", data.descricao],
                ["Tratamento Administrativo", data.tratamentoAdministrativo],
                ["Órgão Anuente", data.orgaoAnuente],
              ].map(([label, value]) => (
                <div key={label} className={label === "Descrição" ? "sm:col-span-2" : ""}>
                  <dt className="font-medium text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* BLOCO 2 - Simulação Tributária */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Simulação Tributária</CardTitle>
          </CardHeader>
          <CardContent>
            {valor > 0 && (
              <p className="text-sm text-muted-foreground mb-3">
                Base de cálculo: <strong className="text-foreground">{fmt(valor)}</strong>
              </p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-semibold text-foreground">Imposto</th>
                    <th className="text-right py-2 font-semibold text-foreground">Alíquota</th>
                    {valor > 0 && <th className="text-right py-2 font-semibold text-foreground">Valor</th>}
                  </tr>
                </thead>
                <tbody>
                  {impostos.map((imp) => (
                    <tr key={imp.sigla} className="border-b border-border/50">
                      <td className="py-2.5 flex items-center gap-1.5">
                        {imp.sigla}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-xs">{tooltips[imp.sigla]}</TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="text-right py-2.5">{imp.aliquota}%</td>
                      {valor > 0 && <td className="text-right py-2.5">{fmt(imp.valor)}</td>}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold text-primary">
                    <td className="py-2.5">Total</td>
                    <td className="text-right py-2.5">{totalAliquota}%</td>
                    {valor > 0 && <td className="text-right py-2.5">{fmt(totalValor)}</td>}
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* BLOCO 3 - Informações Adicionais */}
        {data.informacoesAdicionais.length > 0 && (
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-semibold text-foreground w-32">Tipo</th>
                      <th className="text-left py-2 font-semibold text-foreground">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.informacoesAdicionais.map((info, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2.5 font-medium text-primary">{info.tipo}</td>
                        <td className="py-2.5 text-foreground">{info.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Resultado;

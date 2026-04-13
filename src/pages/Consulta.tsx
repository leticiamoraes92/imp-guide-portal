import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Hash, Layers, LayoutGrid, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppHeader from "@/components/AppHeader";
import { searchNCM } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

type TipoBusca = "ncm" | "capitulo" | "posicao";

const Consulta = () => {
  const [tipoBusca, setTipoBusca] = useState<TipoBusca>("ncm");
  const [codigo, setCodigo] = useState("");
  const [valor, setValor] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem("imp-guide-auth") !== "true") navigate("/");
  }, [navigate]);

  const handleConsultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) {
      toast({ title: "Campo obrigatório", description: "Informe o código para consulta.", variant: "destructive" });
      return;
    }
    const result = searchNCM(codigo.trim());
    if (!result) {
      toast({ title: "NCM não encontrado", description: "Nenhum resultado para o código informado.", variant: "destructive" });
      return;
    }
    localStorage.setItem("imp-guide-result", JSON.stringify(result));
    localStorage.setItem("imp-guide-valor", valor || "0");
    navigate("/resultado");
  };

  const buscaOptions: { value: TipoBusca; label: string; icon: React.ReactNode; placeholder: string }[] = [
    { value: "ncm", label: "NCM Completo", icon: <Hash className="h-5 w-5" />, placeholder: "Ex: 8471.30.19" },
    { value: "capitulo", label: "Capítulo", icon: <Layers className="h-5 w-5" />, placeholder: "Ex: 84" },
    { value: "posicao", label: "Posição", icon: <LayoutGrid className="h-5 w-5" />, placeholder: "Ex: 8471" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader showLogout />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Consulta de Classificação Fiscal (NCM)</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConsultar} className="space-y-6">
              {/* Tipo de busca */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  Tipo de busca
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">Define a forma de busca do NCM (completo, capítulo ou posição)</TooltipContent>
                  </Tooltip>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {buscaOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setTipoBusca(opt.value); setCodigo(""); }}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        tipoBusca === opt.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Código */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  Código
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">Código de classificação fiscal da mercadoria</TooltipContent>
                  </Tooltip>
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder={buscaOptions.find((o) => o.value === tipoBusca)?.placeholder}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Valor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  Valor da Importação (R$)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">Valor total do produto importado em reais</TooltipContent>
                  </Tooltip>
                </label>
                <Input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Ex: 50000"
                  min="0"
                  step="0.01"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Search className="h-4 w-4 mr-2" />
                Consultar
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-4">
          NCMs disponíveis para teste: 8471.30.19 · 0901.11.10 · 6204.62.00 · 2204.21.00
        </p>
      </main>
    </div>
  );
};

export default Consulta;

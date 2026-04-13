import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, User, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === "admin" && senha === "1234") {
      localStorage.setItem("imp-guide-auth", "true");
      navigate("/consulta");
    } else {
      setErro("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-header text-header-foreground py-6">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <Package className="h-10 w-10" />
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">IMP Guide</h1>
            <p className="text-sm opacity-80">Sistema de Consulta de Importação</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-2">
            <h2 className="text-xl font-semibold text-foreground">Acesso ao Sistema</h2>
            <p className="text-sm text-muted-foreground">Informe suas credenciais para entrar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {erro && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {erro}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={usuario}
                    onChange={(e) => { setUsuario(e.target.value); setErro(""); }}
                    placeholder="Digite seu usuário"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                    placeholder="Digite sua senha"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Credenciais de teste: admin / 1234
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

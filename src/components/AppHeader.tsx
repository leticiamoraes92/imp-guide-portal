import { Package, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  showLogout?: boolean;
}

const AppHeader = ({ showLogout = false }: AppHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("imp-guide-auth");
    navigate("/");
  };

  return (
    <header className="bg-header text-header-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">IMP Guide</h1>
            <p className="text-sm opacity-80">Consulta de Importação</p>
          </div>
        </div>
        {showLogout && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("imp-guide-auth") === "true") {
      navigate("/consulta");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return null;
};

export default Index;

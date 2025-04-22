
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { User as UserType } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  currentUser?: UserType | null;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentUser,
  onLogout
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hide header on login page */}
      {location.pathname !== "/" && <Header currentUser={currentUser} onLogout={handleLogout} />}
      <main className="flex-1 container py-6 md:py-10">{children}</main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export const AdminLayout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate("/", { replace: true });
    }
  };
  
  return <Layout currentUser={currentUser} onLogout={handleLogout}>{children}</Layout>;
};

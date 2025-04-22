
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { User as UserType } from "@/types";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hide header on login page */}
      {location.pathname !== "/" && <Header currentUser={currentUser} onLogout={onLogout} />}
      <main className="flex-1 container py-6 md:py-10">{children}</main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export const AdminLayout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {
  return <Layout currentUser={currentUser} onLogout={onLogout}>{children}</Layout>;
};

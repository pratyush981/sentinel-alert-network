
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { User } from "@/types";
import { mockUsers } from "@/data/mockData";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  requireAdmin = false,
}) => {
  // For demo purposes, we'll use the first admin user
  const currentUser: User | undefined = mockUsers.find(user => {
    if (requireAdmin) {
      return user.role === "admin";
    }
    return true;
  });

  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hide header on login page */}
      {location.pathname !== "/" && <Header currentUser={currentUser} />}
      <main className="flex-1 container py-6 md:py-10">{children}</main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return <Layout requireAdmin={true}>{children}</Layout>;
};


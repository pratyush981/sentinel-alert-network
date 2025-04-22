
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/types";

interface HeaderProps {
  currentUser?: UserType | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide whole header on login page
  if (location.pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to={currentUser?.role === "admin" ? "/admin" : "/disasters"} className="mr-6 flex items-center space-x-2">
            <User className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block">
              Disaster Relief Bharat
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {currentUser?.role === "admin" ? (
              <>
                <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Admin Dashboard
                </Link>
                <Link to="/admin/actions" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Actions
                </Link>
              </>
            ) : (
              <>
                <Link to="/disasters" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Home
                </Link>
                <Link to="/report" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Report Disaster
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search could go here if needed */}
          </div>
          <nav className="flex items-center gap-2">
            {currentUser ? (
              <>
                <Link to={currentUser.role === "admin" ? "/admin/profile" : "/profile"}>
                  <Button variant="outline" size="sm" className="mr-2">
                    {currentUser.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={onLogout} title="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
      {showMobileMenu && (
        <MobileNav 
          currentUser={currentUser}
          onClose={() => setShowMobileMenu(false)}
        />
      )}
    </header>
  );
};

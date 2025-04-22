
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface MobileNavProps {
  currentUser?: User | null;
  onClose: () => void;
}

export function MobileNav({ currentUser, onClose }: MobileNavProps) {
  return (
    <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in fade-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-background p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            to="/"
            className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/report"
            className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            onClick={onClose}
          >
            Report Disaster
          </Link>
          {currentUser?.role === "admin" ? (
            <>
              <Link
                to="/admin"
                className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={onClose}
              >
                Admin Dashboard
              </Link>
              <Link
                to="/admin/actions"
                className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={onClose}
              >
                Actions
              </Link>
              <Link
                to="/admin/profile"
                className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={onClose}
              >
                Profile
              </Link>
            </>
          ) : currentUser ? (
            <Link
              to="/profile"
              className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              onClick={onClose}
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              onClick={onClose}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

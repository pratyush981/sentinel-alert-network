
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogIn, User, Key } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-card border rounded-lg p-8 mt-10 shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login to Disaster Relief Bharat</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Select the type of portal you wish to access.
        </p>
        <div className="flex flex-col gap-6">
          <Button
            variant="default"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => navigate("/disasters")}
          >
            <User className="h-5 w-5" />
            User Portal
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border-green-600 text-green-800"
            onClick={() => navigate("/admin")}
          >
            <Key className="h-5 w-5" />
            Admin Portal
          </Button>
        </div>
        <div className="mt-8 flex justify-center text-sm text-muted-foreground">
          <LogIn className="h-4 w-4 mr-2" />
          Secure access for all users & admins
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

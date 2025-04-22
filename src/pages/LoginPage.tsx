
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogIn, User, Key, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Disaster Relief Bharat</h1>
          </div>
          <p className="text-muted-foreground">
            Select your portal to access the platform
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-4">
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 h-12 text-lg"
            onClick={() => navigate("/disasters")}
          >
            <User className="h-5 w-5" />
            Citizen Portal
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-green-600 text-green-800 hover:bg-green-50 h-12 text-lg"
            onClick={() => navigate("/admin")}
          >
            <Key className="h-5 w-5" />
            Admin Portal
          </Button>
          
          <div className="mt-6 flex justify-center text-sm text-muted-foreground">
            <LogIn className="h-4 w-4 mr-2" />
            Secure access for authorized personnel
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

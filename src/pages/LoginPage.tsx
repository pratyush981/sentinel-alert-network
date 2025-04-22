
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Key, Mail, Lock } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { User as UserType } from "@/types";

interface LoginPageProps {
  setCurrentUser: (user: UserType) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setCurrentUser }) => {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // fake password, match by email only!
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRoleSelect(selected: "user" | "admin") {
    setRole(selected);
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const match = mockUsers.find(
      (u) => u.role === role && u.email === email.trim()
    );
    if (!match) {
      setError("Invalid email or role. Try one from the sample users.");
      return;
    }
    // Accept any password for demo
    setCurrentUser(match);
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/disasters", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex items-center justify-center space-x-2">
            <User className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Disaster Relief Bharat</h1>
          </div>
          <p className="text-muted-foreground">
            Fake Login - Select portal and enter one of the example emails
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex justify-center mb-2 gap-4">
            <Button
              variant={role === "user" ? "default" : "outline"}
              className={`flex-1 ${role === "user" ? "bg-green-600 text-white" : ""}`}
              onClick={() => handleRoleSelect("user")}
            >
              <User className="h-5 w-5 mr-1" /> User
            </Button>
            <Button
              variant={role === "admin" ? "default" : "outline"}
              className={`flex-1 ${role === "admin" ? "bg-green-600 text-white" : ""}`}
              onClick={() => handleRoleSelect("admin")}
            >
              <Key className="h-5 w-5 mr-1" /> Admin
            </Button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                <Mail className="inline h-4 w-4 mr-1" /> Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder={role === "admin" ? "sarah.j@emergencyresponse.gov" : "john.smith@example.com"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                <Lock className="inline h-4 w-4 mr-1" /> Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="any password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full h-12 mt-2 bg-green-600 hover:bg-green-700 text-lg">
              Login as {role === "admin" ? "Admin" : "User"}
            </Button>
          </form>
          <div className="text-xs text-muted-foreground mt-4">
            <div>Example Users:</div>
            <div>User: john.smith@example.com</div>
            <div>Admin: sarah.j@emergencyresponse.gov</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

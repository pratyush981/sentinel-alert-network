
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut, MapPin, Mail, UserCircle, Building, Phone } from "lucide-react";
import { User as UserType } from "@/types";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
  currentUser: UserType;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate("/", { replace: true });
  };

  if (!currentUser) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your profile.</p>
          <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
            Go to Login
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser} onLogout={handleLogout}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1 shadow-md bg-gradient-to-b from-green-50 to-white">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-green-100 p-6 rounded-full mb-4">
                <UserCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-xl">{currentUser.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{currentUser.email}</p>
              <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                {currentUser.role.toUpperCase()}
              </div>
            </CardHeader>
          </Card>

          <Card className="md:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-3">
                  <div className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    Name
                  </div>
                  <div className="col-span-3">{currentUser.name}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-3">
                  <div className="font-medium flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    Email
                  </div>
                  <div className="col-span-3 break-all">{currentUser.email}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-3">
                  <div className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    Location
                  </div>
                  <div className="col-span-3">New Delhi, India</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-3">
                  <div className="font-medium flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    Contact
                  </div>
                  <div className="col-span-3">{currentUser.contact || "Not provided"}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    Organization
                  </div>
                  <div className="col-span-3">{currentUser.organization || "Not provided"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <LogOut className="h-5 w-5 mr-2 text-green-600" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Log Out
            </Button>
            <Button variant="outline" className="w-full bg-amber-50 hover:bg-amber-100 border-amber-200">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

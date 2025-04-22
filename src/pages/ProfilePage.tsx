
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { User as UserType } from "@/types";

interface ProfilePageProps {
  currentUser: UserType;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onLogout }) => {
  if (!currentUser) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <Button 
            variant="destructive" 
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{currentUser.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{currentUser.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Name</div>
                <div className="col-span-3">{currentUser.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Email</div>
                <div className="col-span-3">{currentUser.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Role</div>
                <div className="col-span-3 capitalize">{currentUser.role}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Location</div>
                <div className="col-span-3">New Delhi, India</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Contact</div>
                <div className="col-span-3">{currentUser.contact || "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Organization</div>
                <div className="col-span-3">{currentUser.organization || "N/A"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

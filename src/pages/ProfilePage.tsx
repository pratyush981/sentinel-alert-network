
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserType } from "@/types";

interface ProfilePageProps {
  currentUser: UserType;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
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
    <Layout currentUser={currentUser}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
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

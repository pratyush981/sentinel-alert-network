
import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/Layout";
import { mockUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building, Mail, Phone, Save, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminProfile: React.FC = () => {
  const { toast } = useToast();
  
  // Use the first admin user as the current user
  const adminUser = mockUsers.find((user) => user.role === "admin");
  
  const [profileData, setProfileData] = useState({
    name: adminUser?.name || "",
    email: adminUser?.email || "",
    contact: adminUser?.contact || "",
    organization: adminUser?.organization || "",
    bio: "Emergency Response Coordinator with over 10 years of experience in disaster management and response coordination.",
    notifications: {
      email: true,
      sms: true,
      app: true,
    },
    theme: "light",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (type: string) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type as keyof typeof prev.notifications],
      },
    }));
  };
  
  const handleThemeChange = (theme: string) => {
    setProfileData((prev) => ({ ...prev, theme }));
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Your settings have been successfully updated.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings
        </p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contact"
                          name="contact"
                          value={profileData.contact}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="organization"
                          name="organization"
                          value={profileData.organization}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / Description</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-bold">Security</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-bold">Account Summary</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Account Type</h3>
                      <p className="text-muted-foreground">Administrator</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Member Since</h3>
                      <p className="text-muted-foreground">March 15, 2022</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Last Login</h3>
                      <p className="text-muted-foreground">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Permissions</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-success" />
                          <span>View all emergencies</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-success" />
                          <span>Update emergency status</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-success" />
                          <span>Add responses</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-success" />
                          <span>Export data</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-success" />
                          <span>System settings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-bold">Activity Stats</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Responses Added</h3>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Status Updates</h3>
                      <p className="text-2xl font-bold">87</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Cases Resolved</h3>
                      <p className="text-2xl font-bold">53</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-xl font-bold">Notification Preferences</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                        profileData.notifications.email ? "bg-success" : "bg-muted"
                      }`}
                      onClick={() => handleNotificationChange("email")}
                    >
                      <div 
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          profileData.notifications.email ? "translate-x-6" : ""
                        }`} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                      </p>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                        profileData.notifications.sms ? "bg-success" : "bg-muted"
                      }`}
                      onClick={() => handleNotificationChange("sms")}
                    >
                      <div 
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          profileData.notifications.sms ? "translate-x-6" : ""
                        }`} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">In-App Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications within the app
                      </p>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                        profileData.notifications.app ? "bg-success" : "bg-muted"
                      }`}
                      onClick={() => handleNotificationChange("app")}
                    >
                      <div 
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          profileData.notifications.app ? "translate-x-6" : ""
                        }`} 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Notification Types</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="new-emergency"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="new-emergency">New emergency reports</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="critical-emergency"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="critical-emergency">Critical emergencies</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="status-updates"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="status-updates">Status updates</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="system-alerts"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="system-alerts">System alerts</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-xl font-bold">Display Preferences</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          profileData.theme === "light" ? "border-primary" : ""
                        }`}
                        onClick={() => handleThemeChange("light")}
                      >
                        <div className="h-20 rounded bg-white border mb-2" />
                        <div className="text-center">Light</div>
                      </div>
                      
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          profileData.theme === "dark" ? "border-primary" : ""
                        }`}
                        onClick={() => handleThemeChange("dark")}
                      >
                        <div className="h-20 rounded bg-gray-900 border mb-2" />
                        <div className="text-center">Dark</div>
                      </div>
                      
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          profileData.theme === "system" ? "border-primary" : ""
                        }`}
                        onClick={() => handleThemeChange("system")}
                      >
                        <div className="h-20 rounded bg-gradient-to-r from-white to-gray-900 border mb-2" />
                        <div className="text-center">System</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Default View</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="view-dashboard"
                          name="default-view"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="view-dashboard">Dashboard</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="view-emergencies"
                          name="default-view"
                          className="mr-2"
                        />
                        <Label htmlFor="view-emergencies">Emergency List</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="view-map"
                          name="default-view"
                          className="mr-2"
                        />
                        <Label htmlFor="view-map">Map View</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Language</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lang-en"
                          name="language"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="lang-en">English</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lang-es"
                          name="language"
                          className="mr-2"
                        />
                        <Label htmlFor="lang-es">Spanish</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lang-fr"
                          name="language"
                          className="mr-2"
                        />
                        <Label htmlFor="lang-fr">French</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-bold">System Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="auto-backup"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="auto-backup">Enable automatic backups</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="data-retention"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="data-retention">
                          Auto-archive resolved emergencies after 30 days
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="analytics"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="analytics">
                          Collect anonymous usage analytics
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="two-factor"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="two-factor">Enable two-factor authentication</Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="session-timeout"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="session-timeout">
                          Automatically log out after 30 minutes of inactivity
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ip-restriction"
                          className="mr-2"
                        />
                        <Label htmlFor="ip-restriction">
                          Restrict access to trusted IP addresses
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminProfile;

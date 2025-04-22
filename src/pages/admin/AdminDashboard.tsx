
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/Layout";
import { DisasterTable } from "@/components/admin/DisasterTable";
import { mockDisasters } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const [disasters, setDisasters] = useState([...mockDisasters]);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Refresh disasters data whenever the component mounts or refresh is triggered
  useEffect(() => {
    console.log("Refreshing disaster data...");
    // In a real app, this would be an API call
    setDisasters([...mockDisasters]);
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    toast({
      title: "Data Refreshed",
      description: "Latest disaster reports have been loaded.",
    });
  };
  
  // Calculate some statistics for the dashboard
  const totalDisasters = disasters.length;
  const activeDisasters = disasters.filter(
    (d) => d.status !== "resolved" && d.status !== "closed"
  ).length;
  const criticalDisasters = disasters.filter(
    (d) => d.severity === "critical"
  ).length;
  
  return (
    <AdminLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and respond to emergency situations
          </p>
        </div>
        <Button 
          onClick={handleRefresh}
          className="flex items-center gap-2"
          variant="outline"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-md transition-all hover:shadow-lg">
          <CardHeader className="pb-2 bg-primary/5">
            <CardTitle className="text-sm font-medium">
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalDisasters}</div>
              <div className="p-2 bg-primary/10 rounded-full">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md transition-all hover:shadow-lg">
          <CardHeader className="pb-2 bg-warning/5">
            <CardTitle className="text-sm font-medium">
              Active Emergencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{activeDisasters}</div>
              <div className="p-2 bg-warning/10 rounded-full">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md transition-all hover:shadow-lg">
          <CardHeader className="pb-2 bg-alert/5">
            <CardTitle className="text-sm font-medium">
              Critical Situations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{criticalDisasters}</div>
              <div className="p-2 bg-alert/10 rounded-full">
                <AlertTriangle className="h-5 w-5 text-alert" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="border rounded-lg p-6 bg-card shadow-md">
        <h2 className="text-xl font-bold mb-6">All Emergency Reports</h2>
        <DisasterTable disasters={disasters} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

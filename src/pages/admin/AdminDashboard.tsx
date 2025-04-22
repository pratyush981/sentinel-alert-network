
import React from "react";
import { AdminLayout } from "@/components/layout/Layout";
import { DisasterTable } from "@/components/admin/DisasterTable";
import { mockDisasters } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AdminDashboard: React.FC = () => {
  // Calculate some statistics for the dashboard
  const totalDisasters = mockDisasters.length;
  const activeDisasters = mockDisasters.filter(
    (d) => d.status !== "resolved" && d.status !== "closed"
  ).length;
  const criticalDisasters = mockDisasters.filter(
    (d) => d.severity === "critical"
  ).length;
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and respond to emergency situations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
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
      
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-bold mb-6">All Emergency Reports</h2>
        <DisasterTable disasters={mockDisasters} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

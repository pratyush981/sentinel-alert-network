
import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDisasters } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { DisasterReport, DisasterStatus } from "@/types";
import { AlertTriangle, Download, FileText, FilePlus, MapPin, Phone, Save, Send } from "lucide-react";
import { exportAsCSV, exportAsPDF } from "@/utils/exportUtils";

const AdminActions: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>("export");
  
  // Filter disasters by status
  const getDisastersByStatus = (status: DisasterStatus) => {
    return mockDisasters.filter((d) => d.status === status);
  };
  
  // Export data handlers
  const handleExport = (format: "csv" | "pdf", status?: DisasterStatus) => {
    let dataToExport = mockDisasters;
    
    if (status) {
      dataToExport = getDisastersByStatus(status);
    }
    
    if (format === "csv") {
      exportAsCSV(dataToExport);
    } else {
      exportAsPDF(dataToExport);
    }
    
    toast({
      title: "Export Successful",
      description: `${status ? status + " " : ""}Data exported as ${format.toUpperCase()}.`,
    });
  };
  
  // Batch action handler (this would apply an action to multiple disasters)
  const handleBatchAction = (action: string, status: DisasterStatus) => {
    toast({
      title: "Action Performed",
      description: `${action} performed on ${status} disasters.`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Actions</h1>
        <p className="text-muted-foreground">
          Perform batch actions and export disaster report data
        </p>
      </div>
      
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="batch">Batch Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export All Data</CardTitle>
                <CardDescription>
                  Export all emergency reports in your preferred format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This will export all {mockDisasters.length} emergency reports in your system,
                  including all details and status information.
                </p>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleExport("csv")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport("pdf")}
                >
                  <FilePlus className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Export by Status</CardTitle>
                <CardDescription>
                  Export specific emergency reports by their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Reported</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("reported").length} reports
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("csv", "reported")}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export CSV</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("pdf", "reported")}
                      >
                        <FilePlus className="h-4 w-4" />
                        <span className="sr-only">Export PDF</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Reviewing</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("reviewing").length} reports
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("csv", "reviewing")}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export CSV</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("pdf", "reviewing")}
                      >
                        <FilePlus className="h-4 w-4" />
                        <span className="sr-only">Export PDF</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Responding</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("responding").length} reports
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("csv", "responding")}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export CSV</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("pdf", "responding")}
                      >
                        <FilePlus className="h-4 w-4" />
                        <span className="sr-only">Export PDF</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Resolved</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("resolved").length} reports
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("csv", "resolved")}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export CSV</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("pdf", "resolved")}
                      >
                        <FilePlus className="h-4 w-4" />
                        <span className="sr-only">Export PDF</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Closed</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("closed").length} reports
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("csv", "closed")}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export CSV</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport("pdf", "closed")}
                      >
                        <FilePlus className="h-4 w-4" />
                        <span className="sr-only">Export PDF</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="batch" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Status Update</CardTitle>
                <CardDescription>
                  Update the status of multiple emergency reports at once
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Reported Emergencies</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("reported").length} reports
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBatchAction("Mark as Reviewing", "reported")}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mark as Reviewing
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Reviewing Emergencies</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("reviewing").length} reports
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBatchAction("Mark as Responding", "reviewing")}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mark as Responding
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Responding Emergencies</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("responding").length} reports
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBatchAction("Mark as Resolved", "responding")}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mark as Resolved
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Resolved Emergencies</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDisastersByStatus("resolved").length} reports
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBatchAction("Mark as Closed", "resolved")}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Mark as Closed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Batch Notifications</CardTitle>
                <CardDescription>
                  Send notifications to users or personnel for multiple reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Notify About Critical Emergencies</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send notifications about all critical emergencies to all personnel.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => 
                        toast({
                          title: "Notifications Sent",
                          description: "Critical emergency notifications have been sent to all personnel.",
                        })
                      }
                    >
                      Send Notifications
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Alert Area Residents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send alerts to residents in areas affected by current emergencies.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => 
                        toast({
                          title: "Alerts Sent",
                          description: "Area alerts have been sent to all registered residents in affected zones.",
                        })
                      }
                    >
                      Send Area Alerts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Perform system-wide administrative actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => 
                toast({
                  title: "Database Backup Started",
                  description: "A full backup of the disaster management system has been initiated.",
                })
              }
            >
              <Download className="h-5 w-5 mb-2" />
              <div className="text-sm font-medium">Backup System</div>
              <div className="text-xs text-muted-foreground">Create full backup</div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => 
                toast({
                  title: "Report Generated",
                  description: "Monthly activity report has been generated and sent to administrators.",
                })
              }
            >
              <FileText className="h-5 w-5 mb-2" />
              <div className="text-sm font-medium">Generate Report</div>
              <div className="text-xs text-muted-foreground">Monthly activity report</div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => 
                toast({
                  title: "System Check Complete",
                  description: "All systems are operational and functioning normally.",
                })
              }
            >
              <AlertTriangle className="h-5 w-5 mb-2" />
              <div className="text-sm font-medium">System Check</div>
              <div className="text-xs text-muted-foreground">Verify all systems</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminActions;


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/Layout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  addDisasterResponse, 
  disasterTypes, 
  mockDisasters,
  updateDisasterStatus
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { DisasterStatus } from "@/types";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Building, 
  Clock, 
  Download, 
  Edit, 
  FileText, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  User 
} from "lucide-react";

const AdminDisasterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const disaster = mockDisasters.find((d) => d.id === id);
  const [status, setStatus] = useState<DisasterStatus>(disaster?.status as DisasterStatus);
  const [responseMessage, setResponseMessage] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [resources, setResources] = useState("");
  
  if (!disaster) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Emergency Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The emergency report you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/admin')}>Return to Dashboard</Button>
        </div>
      </AdminLayout>
    );
  }
  
  const handleStatusChange = (newStatus: DisasterStatus) => {
    setStatus(newStatus);
    
    const updated = updateDisasterStatus(disaster.id, newStatus);
    if (updated) {
      toast({
        title: "Status Updated",
        description: `Emergency status updated to ${newStatus}.`,
      });
    }
  };
  
  const handleAddResponse = () => {
    if (!responseMessage) {
      toast({
        title: "Missing Information",
        description: "Please enter a response message.",
        variant: "destructive",
      });
      return;
    }
    
    const response = addDisasterResponse(disaster.id, {
      responder: {
        id: "admin1",
        name: "Sarah Johnson",
        role: "Emergency Coordinator",
      },
      message: responseMessage,
      actionTaken: actionTaken || undefined,
      resourcesAllocated: resources ? resources.split(",").map((r) => r.trim()) : undefined,
    });
    
    if (response) {
      toast({
        title: "Response Added",
        description: "Your response has been added to the emergency report.",
      });
      
      // Clear form
      setResponseMessage("");
      setActionTaken("");
      setResources("");
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Edit className="mr-2 h-4 w-4" />
            Edit Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-alert" />
                <span className="font-medium">{disasterTypes[disaster.type].label}</span>
                <StatusBadge status={disaster.severity} type="severity" />
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="status-select">Status:</Label>
                <Select
                  value={status}
                  onValueChange={(value) => handleStatusChange(value as DisasterStatus)}
                >
                  <SelectTrigger id="status-select" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reported">Reported</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="responding">Responding</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{disaster.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{disaster.location}</span>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(disaster.reportedAt).toLocaleString()}</span>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {disaster.description}
              </p>
            </div>
            
            {disaster.affectedArea && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Affected Area</h3>
                <p className="text-muted-foreground">{disaster.affectedArea}</p>
              </div>
            )}
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Reporter Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{disaster.reporter.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{disaster.reporter.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{disaster.reporter.email}</span>
                </div>
                {disaster.reporter.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {disaster.reporter.organization}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Add Response</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="response-message">Response Message*</Label>
                <Textarea
                  id="response-message"
                  placeholder="Enter your response to this emergency..."
                  className="min-h-[100px]"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="action-taken">Action Taken</Label>
                <Textarea
                  id="action-taken"
                  placeholder="Describe actions taken in response to this emergency..."
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="resources">Resources Allocated</Label>
                <Textarea
                  id="resources"
                  placeholder="List resources allocated (comma separated)..."
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleAddResponse}>
                  <Send className="mr-2 h-4 w-4" />
                  Add Response
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Send Alert to Personnel
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Contact Reporter
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Response History</h2>
            {disaster.responses && disaster.responses.length > 0 ? (
              <div className="space-y-4">
                {disaster.responses.map((response) => (
                  <div 
                    key={response.id} 
                    className="border-l-4 border-success pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">
                        {response.responder.name}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(response.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{response.message}</p>
                    {response.actionTaken && (
                      <div className="mb-2">
                        <h4 className="text-xs font-medium">Actions Taken:</h4>
                        <p className="text-xs text-muted-foreground">{response.actionTaken}</p>
                      </div>
                    )}
                    {response.resourcesAllocated && response.resourcesAllocated.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium">Resources:</h4>
                        <ul className="list-disc list-inside text-xs text-muted-foreground">
                          {response.resourcesAllocated.map((resource, idx) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Send className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p>No responses have been added yet.</p>
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Status History</h2>
            <div className="relative pl-6 border-l border-muted-foreground/30">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
              <div className="mb-6">
                <h3 className="text-sm font-medium">Reported</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(disaster.reportedAt).toLocaleString()}
                </p>
                <p className="text-xs">
                  Initial report submitted by {disaster.reporter.name}
                </p>
              </div>
              
              {disaster.status !== "reported" && (
                <>
                  <div className="absolute w-3 h-3 bg-warning rounded-full -left-[6.5px] top-16" />
                  <div className="mb-6">
                    <h3 className="text-sm font-medium">Status Updated</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(disaster.updatedAt).toLocaleString()}
                    </p>
                    <p className="text-xs">
                      Status changed to{" "}
                      <StatusBadge status={disaster.status} type="status" />
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDisasterDetail;

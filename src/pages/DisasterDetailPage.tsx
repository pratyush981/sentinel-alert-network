
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { mockDisasters, disasterTypes } from "@/data/mockData";
import { AlertTriangle, Clock, MapPin, User, Phone, Mail, Building, ArrowLeft } from "lucide-react";

const DisasterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const disaster = mockDisasters.find((d) => d.id === id);
  
  if (!disaster) {
    return (
      <Layout>
        <div className="text-center py-16">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Emergency Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The emergency report you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-alert" />
                <span>{disasterTypes[disaster.type].label}</span>
              </div>
              <StatusBadge status={disaster.severity} type="severity" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{disaster.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{disaster.location}</span>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(disaster.reportedAt).toLocaleString()}</span>
            </div>
            
            <div className="mb-4 px-4 py-3 bg-muted rounded-md">
              <h3 className="font-medium mb-1">Current Status</h3>
              <div className="flex items-center">
                <StatusBadge status={disaster.status} type="status" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Last updated: {new Date(disaster.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {disaster.description}
              </p>
            </div>
            
            {disaster.affectedArea && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Affected Area</h3>
                <p className="text-muted-foreground">{disaster.affectedArea}</p>
              </div>
            )}
          </div>
          
          {disaster.responses && disaster.responses.length > 0 && (
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-bold mb-4">Response Updates</h2>
              <div className="space-y-4">
                {disaster.responses.map((response) => (
                  <div 
                    key={response.id} 
                    className="border-l-4 border-success pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">
                        {response.responder.name} - {response.responder.role}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(response.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{response.message}</p>
                    {response.actionTaken && (
                      <div className="mb-2">
                        <h4 className="text-sm font-medium">Actions Taken:</h4>
                        <p className="text-sm text-muted-foreground">{response.actionTaken}</p>
                      </div>
                    )}
                    {response.resourcesAllocated && response.resourcesAllocated.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium">Resources Allocated:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {response.resourcesAllocated.map((resource, idx) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Reporter Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Name</h3>
                  <p className="text-muted-foreground">{disaster.reporter.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Contact</h3>
                  <p className="text-muted-foreground">{disaster.reporter.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-muted-foreground">{disaster.reporter.email}</p>
                </div>
              </div>
              {disaster.reporter.organization && (
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">Organization</h3>
                    <p className="text-muted-foreground">
                      {disaster.reporter.organization}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Emergency Timeline</h2>
            <div className="relative pl-6 border-l border-muted-foreground/30">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
              <div className="mb-6">
                <h3 className="text-sm font-medium">Reported</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(disaster.reportedAt).toLocaleString()}
                </p>
              </div>
              
              {disaster.status !== "reported" && (
                <>
                  <div className="absolute w-3 h-3 bg-warning rounded-full -left-[6.5px] top-16" />
                  <div className="mb-6">
                    <h3 className="text-sm font-medium">Status Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(disaster.updatedAt).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Status changed to{" "}
                      <StatusBadge status={disaster.status} type="status" />
                    </p>
                  </div>
                </>
              )}
              
              {disaster.responses && disaster.responses.map((response, idx) => (
                <React.Fragment key={response.id}>
                  <div 
                    className="absolute w-3 h-3 bg-success rounded-full -left-[6.5px]" 
                    style={{ top: `${idx * 96 + 112}px` }} 
                  />
                  <div className="mb-6">
                    <h3 className="text-sm font-medium">Response Added</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(response.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      {response.responder.name} added a response
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DisasterDetailPage;

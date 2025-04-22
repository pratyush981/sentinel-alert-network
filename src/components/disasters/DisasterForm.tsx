
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Building, Mail, MapPin, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { DisasterReport, DisasterType, SeverityLevel } from "@/types";
import { disasterTypes, addDisaster } from "@/data/mockData";

export const DisasterForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    type: "" as DisasterType,
    description: "",
    location: "",
    affectedArea: "",
    severity: "" as SeverityLevel,
    reporterName: "",
    reporterContact: "",
    reporterEmail: "",
    reporterOrganization: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.description || !formData.location || !formData.severity || !formData.reporterName || !formData.reporterContact || !formData.reporterEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Format the data to match our DisasterReport type
    const newDisaster: Omit<DisasterReport, "id" | "reportedAt" | "updatedAt" | "status"> = {
      title: formData.title,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      affectedArea: formData.affectedArea,
      severity: formData.severity,
      reporter: {
        name: formData.reporterName,
        contact: formData.reporterContact,
        email: formData.reporterEmail,
        organization: formData.reporterOrganization || undefined,
      },
    };
    
    // Add the disaster to our mock data
    const addedDisaster = addDisaster(newDisaster);
    
    toast({
      title: "Disaster Report Submitted",
      description: "Your report has been successfully submitted.",
    });
    
    // Navigate to the detail page
    navigate(`/disasters/${addedDisaster.id}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">
            Emergency Title*
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief title describing the emergency"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type" className="text-base">
            Emergency Type*
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select emergency type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(disasterTypes).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">
            Description*
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the emergency"
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base">
              Location*
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="pl-10"
                placeholder="City, State"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="severity" className="text-base">
              Severity Level*
            </Label>
            <Select
              value={formData.severity}
              onValueChange={(value) => handleSelectChange("severity", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="affectedArea" className="text-base">
            Affected Area
          </Label>
          <Textarea
            id="affectedArea"
            name="affectedArea"
            value={formData.affectedArea}
            onChange={handleChange}
            placeholder="Description of the affected area (e.g., 5-mile radius around downtown)"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-medium mb-4">Your Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reporterName" className="text-base">
              Full Name*
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="reporterName"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your full name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reporterContact" className="text-base">
                Contact Number*
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reporterContact"
                  name="reporterContact"
                  value={formData.reporterContact}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reporterEmail" className="text-base">
                Email Address*
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reporterEmail"
                  name="reporterEmail"
                  type="email"
                  value={formData.reporterEmail}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reporterOrganization" className="text-base">
              Organization (Optional)
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="reporterOrganization"
                name="reporterOrganization"
                value={formData.reporterOrganization}
                onChange={handleChange}
                className="pl-10"
                placeholder="Your organization (if applicable)"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-alert hover:bg-alert/90">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Submit Report
        </Button>
      </div>
    </form>
  );
};

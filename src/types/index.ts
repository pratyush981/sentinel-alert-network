
export type DisasterType = 
  | "earthquake" 
  | "flood" 
  | "wildfire" 
  | "hurricane" 
  | "tornado" 
  | "tsunami" 
  | "landslide" 
  | "avalanche" 
  | "volcanic_eruption" 
  | "drought" 
  | "epidemic" 
  | "industrial_accident" 
  | "other";

export type SeverityLevel = "low" | "medium" | "high" | "critical";

export type DisasterStatus = "reported" | "reviewing" | "responding" | "resolved" | "closed";

export interface DisasterResponse {
  id: string;
  disasterId: string;
  responder: {
    id: string;
    name: string;
    role: string;
  };
  message: string;
  actionTaken?: string;
  resourcesAllocated?: string[];
  createdAt: string;
}

export interface DisasterReport {
  id: string;
  type: DisasterType;
  title: string;
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  affectedArea: string;
  severity: SeverityLevel;
  reportedAt: string;
  updatedAt: string;
  status: DisasterStatus;
  reporter: {
    name: string;
    contact: string;
    email: string;
    organization?: string;
  };
  images?: string[];
  responses?: DisasterResponse[];
}

export interface DisasterResponse {
  id: string;
  disasterId: string;
  responder: {
    id: string;
    name: string;
    role: string;
  };
  message: string;
  actionTaken?: string;
  resourcesAllocated?: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  organization?: string;
  contact?: string;
}

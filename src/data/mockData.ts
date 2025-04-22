
import { DisasterReport, DisasterType, SeverityLevel, DisasterStatus, User } from '../types';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample disaster types and their corresponding icons
export const disasterTypes: { [key in DisasterType]: { label: string; icon: string } } = {
  earthquake: { label: "Earthquake", icon: "alert-triangle" },
  flood: { label: "Flood", icon: "cloud-rain" },
  wildfire: { label: "Wildfire", icon: "fire-extinguisher" },
  hurricane: { label: "Hurricane", icon: "alert-triangle" },
  tornado: { label: "Tornado", icon: "alert-triangle" },
  tsunami: { label: "Tsunami", icon: "cloud-rain" },
  landslide: { label: "Landslide", icon: "alert-triangle" },
  avalanche: { label: "Avalanche", icon: "alert-triangle" },
  volcanic_eruption: { label: "Volcanic Eruption", icon: "alert-triangle" },
  drought: { label: "Drought", icon: "alert-triangle" },
  epidemic: { label: "Epidemic", icon: "hospital" },
  industrial_accident: { label: "Industrial Accident", icon: "alert-triangle" },
  other: { label: "Other", icon: "alert-triangle" }
};

// Sample severity levels
export const severityLevels: { [key in SeverityLevel]: { label: string; color: string } } = {
  low: { label: "Low", color: "bg-green-500" },
  medium: { label: "Medium", color: "bg-yellow-500" },
  high: { label: "High", color: "bg-orange-500" },
  critical: { label: "Critical", color: "bg-red-500" }
};

// Sample disaster statuses
export const statusTypes: { [key in DisasterStatus]: { label: string; color: string } } = {
  reported: { label: "Reported", color: "bg-gray-500" },
  reviewing: { label: "Reviewing", color: "bg-yellow-500" },
  responding: { label: "Responding", color: "bg-blue-500" },
  resolved: { label: "Resolved", color: "bg-green-500" },
  closed: { label: "Closed", color: "bg-gray-700" }
};

// Sample disaster reports
export const mockDisasters: DisasterReport[] = [
  {
    id: generateId(),
    type: "earthquake",
    title: "7.2 Magnitude Earthquake",
    description: "Strong earthquake causing significant building damage and infrastructure disruption.",
    location: "San Francisco, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    affectedArea: "Downtown and surrounding areas within 10-mile radius",
    severity: "critical",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: "responding",
    reporter: {
      name: "John Smith",
      contact: "+1 (415) 555-1234",
      email: "john.smith@example.com",
      organization: "City Emergency Services"
    },
    responses: [
      {
        id: generateId(),
        disasterId: "1",
        responder: {
          id: "admin1",
          name: "Sarah Johnson",
          role: "Emergency Coordinator"
        },
        message: "Dispatching search and rescue teams to the most affected areas.",
        actionTaken: "Deployed 5 rescue teams, set up 2 emergency shelters",
        resourcesAllocated: ["Medical supplies", "Emergency shelter", "Rescue teams"],
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
      }
    ]
  },
  {
    id: generateId(),
    type: "flood",
    title: "Severe Flooding on 5th Street",
    description: "Flash flooding after heavy rainfall. Multiple streets underwater and several homes affected.",
    location: "Miami, FL",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    affectedArea: "5th Street and surrounding neighborhoods",
    severity: "high",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: "reviewing",
    reporter: {
      name: "Maria Rodriguez",
      contact: "+1 (305) 555-2468",
      email: "maria.r@example.com"
    }
  },
  {
    id: generateId(),
    type: "wildfire",
    title: "Hillside Wildfire",
    description: "Rapidly spreading wildfire moving towards residential areas. Immediate evacuation recommended.",
    location: "Los Angeles, CA",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    affectedArea: "Western hills, extending 15 miles",
    severity: "critical",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    status: "responding",
    reporter: {
      name: "David Chen",
      contact: "+1 (213) 555-3690",
      email: "d.chen@example.com",
      organization: "Local Fire Department"
    }
  },
  {
    id: generateId(),
    type: "industrial_accident",
    title: "Chemical Spill at Industrial Park",
    description: "Hazardous chemical spill at the northern industrial complex. Air quality affected.",
    location: "Houston, TX",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    affectedArea: "2-mile radius around North Industrial Park",
    severity: "medium",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    status: "resolved",
    reporter: {
      name: "Robert Williams",
      contact: "+1 (713) 555-7890",
      email: "r.williams@example.com",
      organization: "Facility Management"
    },
    responses: [
      {
        id: generateId(),
        disasterId: "4",
        responder: {
          id: "admin3",
          name: "Michael Douglas",
          role: "Environmental Specialist"
        },
        message: "Containment teams have successfully contained the spill. Air quality returning to normal levels.",
        actionTaken: "Chemical neutralization and containment procedures",
        resourcesAllocated: ["HazMat team", "Air quality monitoring", "Decontamination equipment"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
      }
    ]
  },
  {
    id: generateId(),
    type: "tornado",
    title: "Tornado Sighting",
    description: "Tornado spotted moving northeast. Seeking confirmation and assessment of damage.",
    location: "Oklahoma City, OK",
    coordinates: { lat: 35.4676, lng: -97.5164 },
    affectedArea: "Eastern suburbs",
    severity: "high",
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    status: "reported",
    reporter: {
      name: "Emily Johnson",
      contact: "+1 (405) 555-1122",
      email: "emily.j@example.com"
    }
  }
];

// Sample users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    organization: "City Emergency Services",
    contact: "+1 (415) 555-1234"
  },
  {
    id: "user2",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    role: "user",
    contact: "+1 (305) 555-2468"
  },
  {
    id: "admin1",
    name: "Sarah Johnson",
    email: "sarah.j@emergencyresponse.gov",
    role: "admin",
    organization: "National Emergency Response Center",
    contact: "+1 (202) 555-9876"
  },
  {
    id: "admin2",
    name: "Thomas Wright",
    email: "t.wright@emergencyresponse.gov",
    role: "admin",
    organization: "National Emergency Response Center",
    contact: "+1 (202) 555-5432"
  }
];

// Utility function to add a new disaster report
export const addDisaster = (disaster: Omit<DisasterReport, "id" | "reportedAt" | "updatedAt" | "status">) => {
  const newDisaster: DisasterReport = {
    ...disaster,
    id: generateId(),
    reportedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "reported"
  };
  
  mockDisasters.unshift(newDisaster);
  return newDisaster;
};

// Utility function to update a disaster status
export const updateDisasterStatus = (id: string, status: DisasterStatus) => {
  const disasterIndex = mockDisasters.findIndex(d => d.id === id);
  if (disasterIndex >= 0) {
    mockDisasters[disasterIndex].status = status;
    mockDisasters[disasterIndex].updatedAt = new Date().toISOString();
    return mockDisasters[disasterIndex];
  }
  return null;
};

// Utility function to add a response to a disaster
export const addDisasterResponse = (disasterId: string, response: Omit<DisasterReport["responses"][0], "id" | "disasterId" | "createdAt">) => {
  const disasterIndex = mockDisasters.findIndex(d => d.id === disasterId);
  if (disasterIndex >= 0) {
    const newResponse: DisasterReport["responses"][0] = {
      ...response,
      id: generateId(),
      disasterId,
      createdAt: new Date().toISOString()
    };
    
    if (!mockDisasters[disasterIndex].responses) {
      mockDisasters[disasterIndex].responses = [];
    }
    
    mockDisasters[disasterIndex].responses!.push(newResponse);
    mockDisasters[disasterIndex].updatedAt = new Date().toISOString();
    
    return newResponse;
  }
  return null;
};

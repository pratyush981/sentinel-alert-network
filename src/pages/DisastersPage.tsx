
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { DisasterCard } from "@/components/disasters/DisasterCard";
import { mockDisasters } from "@/data/mockData";
import { DisasterReport, DisasterType, SeverityLevel } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DisastersPage: React.FC = () => {
  const [disasters, setDisasters] = useState<DisasterReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<DisasterType | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "all">("all");

  // Load disasters on component mount
  useEffect(() => {
    setDisasters(mockDisasters);
  }, []);

  // Apply filters to disasters
  const filteredDisasters = disasters.filter((disaster) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      disaster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply type filter
    const matchesType = typeFilter === "all" || disaster.type === typeFilter;

    // Apply severity filter
    const matchesSeverity =
      severityFilter === "all" || disaster.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setSeverityFilter("all");
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Active Emergencies</h1>
        <p className="text-muted-foreground">
          Track and monitor emergency situations across the network
        </p>
      </div>

      <div className="mb-6 p-4 border rounded-lg bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emergencies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as DisasterType | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="wildfire">Wildfire</SelectItem>
              <SelectItem value="hurricane">Hurricane</SelectItem>
              <SelectItem value="tornado">Tornado</SelectItem>
              <SelectItem value="tsunami">Tsunami</SelectItem>
              <SelectItem value="epidemic">Epidemic</SelectItem>
              <SelectItem value="industrial_accident">Industrial Accident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={severityFilter}
            onValueChange={(value) => setSeverityFilter(value as SeverityLevel | "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      {filteredDisasters.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-xl font-medium">No emergencies found</h3>
          <p className="text-muted-foreground">
            No emergencies match your current filters
          </p>
          <Button variant="link" onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDisasters.map((disaster) => (
            <DisasterCard key={disaster.id} disaster={disaster} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default DisastersPage;

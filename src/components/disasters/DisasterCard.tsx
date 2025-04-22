
import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DisasterReport } from "@/types";
import { disasterTypes } from "@/data/mockData";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

interface DisasterCardProps {
  disaster: DisasterReport;
  showActions?: boolean;
}

export const DisasterCard: React.FC<DisasterCardProps> = ({
  disaster,
  showActions = false,
}) => {
  const formattedDate = new Date(disaster.reportedAt).toLocaleString();
  const disasterTypeInfo = disasterTypes[disaster.type];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-alert" />
          <h3 className="font-semibold">{disasterTypeInfo.label}</h3>
        </div>
        <StatusBadge status={disaster.severity} type="severity" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h2 className="text-xl font-bold mb-2">{disaster.title}</h2>
        <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
          {disaster.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{disaster.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
        <StatusBadge status={disaster.status} type="status" />
        {showActions && (
          <Link to={`/admin/disasters/${disaster.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        )}
        {!showActions && (
          <Link to={`/disasters/${disaster.id}`}>
            <Button variant="outline" size="sm">
              Track Status
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

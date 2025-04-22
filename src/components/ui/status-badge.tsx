
import React from "react";
import { cn } from "@/lib/utils";
import { DisasterStatus, SeverityLevel } from "@/types";
import { severityLevels, statusTypes } from "@/data/mockData";

interface StatusBadgeProps {
  status: DisasterStatus | SeverityLevel;
  type: "status" | "severity";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type,
  className,
}) => {
  const getStatusInfo = () => {
    if (type === "status") {
      return statusTypes[status as DisasterStatus];
    } else {
      return severityLevels[status as SeverityLevel];
    }
  };

  const { label, color } = getStatusInfo();

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        color,
        "text-white",
        className
      )}
    >
      {label}
    </span>
  );
};

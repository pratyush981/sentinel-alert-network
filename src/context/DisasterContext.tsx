
import React, { createContext, useContext, useState, ReactNode } from "react";
import { DisasterReport, DisasterType, SeverityLevel } from "@/types";
import { mockDisasters, disasterTypes } from "@/data/mockData";

interface DisasterContextProps {
  disasters: DisasterReport[];
  addDisaster: (disaster: Omit<DisasterReport, "id" | "reportedAt" | "updatedAt" | "status">) => DisasterReport;
  updateDisaster: (id: string, updated: Partial<DisasterReport>) => void;
  // ...future: removeDisaster, etc.
}

const DisasterContext = createContext<DisasterContextProps | undefined>(undefined);

export const DisasterProvider = ({ children }: { children: ReactNode }) => {
  const [disasters, setDisasters] = useState<DisasterReport[]>([...mockDisasters]);

  // Generate fake ID (replace with real on backend)
  const genId = () => Math.random().toString(36).slice(2, 12);

  const addDisaster = (
    data: Omit<DisasterReport, "id" | "reportedAt" | "updatedAt" | "status">
  ): DisasterReport => {
    const now = new Date().toISOString();
    const newDisaster: DisasterReport = {
      ...data,
      id: genId(),
      reportedAt: now,
      updatedAt: now,
      status: "reported",
      responses: [],
    };
    setDisasters((ds) => [newDisaster, ...ds]);
    return newDisaster;
  };

  const updateDisaster = (id: string, updated: Partial<DisasterReport>) => {
    setDisasters((ds) =>
      ds.map((d) => (d.id === id ? { ...d, ...updated, updatedAt: new Date().toISOString() } : d))
    );
  };

  return (
    <DisasterContext.Provider value={{ disasters, addDisaster, updateDisaster }}>
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisasters = (): DisasterContextProps => {
  const ctx = useContext(DisasterContext);
  if (!ctx) throw new Error("useDisasters must be used within DisasterProvider");
  return ctx;
};


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Download, 
  FileText, 
  MoreHorizontal, 
  Search,
  FilePlus
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DisasterReport, DisasterStatus } from "@/types";
import { disasterTypes, updateDisasterStatus } from "@/data/mockData";
import { StatusBadge } from "@/components/ui/status-badge";
import { exportAsCSV, exportAsPDF } from "@/utils/exportUtils";

interface DisasterTableProps {
  disasters: DisasterReport[];
}

export const DisasterTable: React.FC<DisasterTableProps> = ({ disasters: initialDisasters }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [disasters, setDisasters] = useState(initialDisasters);
  
  const filteredDisasters = disasters.filter((disaster) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      disaster.title.toLowerCase().includes(searchLower) ||
      disaster.location.toLowerCase().includes(searchLower) ||
      disasterTypes[disaster.type].label.toLowerCase().includes(searchLower) ||
      disaster.description.toLowerCase().includes(searchLower)
    );
  });
  
  const handleStatusChange = (id: string, newStatus: DisasterStatus) => {
    const updatedDisaster = updateDisasterStatus(id, newStatus);
    
    if (updatedDisaster) {
      setDisasters((prev) =>
        prev.map((d) => (d.id === id ? updatedDisaster : d))
      );
      
      toast({
        title: "Status Updated",
        description: `Disaster status updated to ${newStatus}.`,
      });
    }
  };
  
  const handleExport = (format: "csv" | "pdf") => {
    if (format === "csv") {
      exportAsCSV(filteredDisasters);
    } else {
      exportAsPDF(filteredDisasters);
    }
    
    toast({
      title: "Export Successful",
      description: `Data exported as ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search disasters..."
            className="pl-10 w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("pdf")}
            className="flex items-center gap-1"
          >
            <FilePlus className="h-4 w-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Reported</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDisasters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  {searchTerm ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Search className="h-10 w-10 mb-2 opacity-20" />
                      <p>No disasters found matching your search.</p>
                      <p className="text-sm">Try a different search term.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertTriangle className="h-10 w-10 mb-2 opacity-20" />
                      <p>No disaster reports available.</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredDisasters.map((disaster) => (
                <TableRow key={disaster.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-alert" />
                      <span>{disasterTypes[disaster.type].label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/admin/disasters/${disaster.id}`}
                      className="hover:underline"
                    >
                      {disaster.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {disaster.location}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(disaster.reportedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={disaster.severity} type="severity" />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={disaster.status} type="status" />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            to={`/admin/disasters/${disaster.id}`}
                            className="flex w-full"
                          >
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(disaster.id, "reviewing")}
                        >
                          Mark as Reviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(disaster.id, "responding")}
                        >
                          Mark as Responding
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(disaster.id, "resolved")}
                        >
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(disaster.id, "closed")}
                        >
                          Mark as Closed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

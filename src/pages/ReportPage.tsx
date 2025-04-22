
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DisasterForm } from "@/components/disasters/DisasterForm";

const ReportPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Report an Emergency</h1>
          <p className="text-muted-foreground">
            Please provide as much detail as possible to help emergency services
            respond effectively.
          </p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <DisasterForm />
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;

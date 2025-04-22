
import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { DisasterCard } from "@/components/disasters/DisasterCard";
import { mockDisasters } from "@/data/mockData";

const HomePage: React.FC = () => {
  // Get recent disasters for the showcase
  const recentDisasters = mockDisasters.slice(0, 3);

  return (
    <Layout>
      <section className="flex flex-col-reverse md:flex-row items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Sentinel Alert Network
          </h1>
          <h2 className="text-xl font-medium text-muted-foreground">
            Real-time disaster reporting and management system
          </h2>
          <p className="text-muted-foreground">
            Report emergencies, track responses, and stay informed about critical
            situations in your area. Our platform connects communities with
            emergency responders for faster and more effective relief.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/report">
              <Button className="bg-alert hover:bg-alert/90 w-full sm:w-auto">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Emergency
              </Button>
            </Link>
            <Link to="/disasters">
              <Button variant="outline" className="w-full sm:w-auto">
                View Active Emergencies
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-10 -left-10 h-40 w-40 bg-warning/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-alert/20 rounded-full blur-3xl" />
            <div className="relative rounded-lg border bg-card p-8 shadow-xl">
              <div className="flex flex-col items-center text-center space-y-2 mb-6">
                <AlertTriangle className="h-12 w-12 text-alert mb-2" />
                <h3 className="text-2xl font-bold">Emergency Response Platform</h3>
                <p className="text-muted-foreground text-sm">
                  Connecting communities with emergency services for faster response
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Immediate Reporting</h4>
                    <p className="text-sm text-muted-foreground">
                      Submit reports quickly from anywhere
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <div className="mr-4 rounded-full bg-secondary/10 p-2">
                    <AlertTriangle className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Real-time Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Get immediate response status
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <div className="mr-4 rounded-full bg-accent/10 p-2">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Coordinated Response</h4>
                    <p className="text-sm text-muted-foreground">
                      Connecting resources where needed most
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Emergencies</h2>
          <Link to="/disasters">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDisasters.map((disaster) => (
            <DisasterCard key={disaster.id} disaster={disaster} />
          ))}
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform streamlines emergency reporting and response to ensure
            communities get help when they need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-alert/20 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-alert" />
            </div>
            <h3 className="text-xl font-medium mb-2">Report Emergency</h3>
            <p className="text-muted-foreground">
              Submit detailed information about the emergency using our
              simple form.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <h3 className="text-xl font-medium mb-2">Immediate Notification</h3>
            <p className="text-muted-foreground">
              Administrators are alerted instantly and begin coordinating
              response efforts.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-medium mb-2">Track Status</h3>
            <p className="text-muted-foreground">
              Follow the progress of the response efforts in real-time
              through our platform.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

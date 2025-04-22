
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import DisasterDetailPage from "./pages/DisasterDetailPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminActions from "./pages/admin/AdminActions";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminDisasterDetail from "./pages/admin/AdminDisasterDetail";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { User } from "@/types";

const queryClient = new QueryClient();

function AppInner() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // These will be passed to portal pages so they can access/logout the user
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              currentUser ? (
                currentUser.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/disasters" replace />
                )
              ) : (
                <LoginPage setCurrentUser={setCurrentUser} />
              )
            } 
          />
          {/* User Portal */}
          <Route path="/disasters" element={
            currentUser && currentUser.role === "user" ? 
              <HomePage currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/report" element={
            currentUser && currentUser.role === "user" ? 
              <ReportPage currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/disasters/:id" element={
            currentUser && currentUser.role === "user" ? 
              <DisasterDetailPage currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/profile" element={
            currentUser && currentUser.role === "user" ? 
              <ProfilePage currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />

          {/* Admin Portal */}
          <Route path="/admin" element={
            currentUser && currentUser.role === "admin" ? 
              <AdminDashboard currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/admin/actions" element={
            currentUser && currentUser.role === "admin" ? 
              <AdminActions currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/admin/profile" element={
            currentUser && currentUser.role === "admin" ? 
              <AdminProfile currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/admin/disasters/:id" element={
            currentUser && currentUser.role === "admin" ? 
              <AdminDisasterDetail currentUser={currentUser} onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppInner />
  </QueryClientProvider>
);

export default App;


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
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/disasters" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/disasters/:id" element={<DisasterDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/actions" element={<AdminActions />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/disasters/:id" element={<AdminDisasterDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

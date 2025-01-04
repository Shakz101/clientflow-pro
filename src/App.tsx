import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewClient from "./pages/clients/New";
import ClientDetails from "./pages/clients/Details";
import Clients from "./pages/clients/Clients";
import Communication from "./pages/clients/Communication";
import Documents from "./pages/clients/Documents";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/404.html";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full overflow-hidden">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col min-w-0">
                        <AppHeader />
                        <main className="flex-1 overflow-auto">
                          <Routes>
                            <Route index element={<Index />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/clients/new" element={<NewClient />} />
                            <Route path="/clients/:id" element={<ClientDetails />} />
                            <Route path="/clients/:id/communication" element={<Communication />} />
                            <Route path="/clients/:id/documents" element={<Documents />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Games from "./pages/Games";
import News from "./pages/News";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes publiques avec Navbar et Footer */}
            <Route path="/" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <Index />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/games" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <Games />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/news" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <News />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/team" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <Team />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            
            {/* Routes d'authentification et dashboard (sans Navbar/Footer) */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Route 404 */}
            <Route path="*" element={
              <div className="min-h-screen bg-dark">
                <Navbar />
                <main>
                  <NotFound />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

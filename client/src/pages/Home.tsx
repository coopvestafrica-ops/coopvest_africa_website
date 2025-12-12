import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, Users, TrendingUp, Lock, Moon, Sun } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import Process from "@/components/sections/Process";
import AppShowcase from "@/components/sections/AppShowcase";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, switchable } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Navigation */}
      <Navigation user={user} isAuthenticated={isAuthenticated} logout={logout} />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Process Section */}
      <Process />

      {/* App Showcase Section */}
      <AppShowcase />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
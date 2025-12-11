import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import Chatbot from "./components/Chatbot";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberDashboard from "./pages/MemberDashboard";
import Savings from "./pages/Savings";
import KYCVerification from "./pages/KYCVerification";
import TwoFASetup from "./pages/TwoFASetup";
import PasswordReset from "./pages/PasswordReset";
import { trpc } from "./lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/member/dashboard"} component={MemberDashboard} />
      <Route path={"/member/savings"} component={Savings} />
      <Route path={"/member/kyc"} component={KYCVerification} />
      <Route path={"/member/2fa"} component={TwoFASetup} />
      <Route path={"/password-reset"} component={PasswordReset} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/super-admin"} component={SuperAdminPanel} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${window.location.origin}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light" switchable>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
                <Chatbot />
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
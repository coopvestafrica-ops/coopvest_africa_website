import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Users, CreditCard, TrendingUp, AlertCircle, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

function AdminDashboardContent() {
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");

  const stats: StatCard[] = [
    {
      title: "Total Members",
      value: "50,234",
      change: "+12% from last month",
      icon: <Users className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Active Loans",
      value: "12,456",
      change: "+8% from last month",
      icon: <CreditCard className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Total Contributions",
      value: "$2.5M",
      change: "+15% from last month",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Pending Approvals",
      value: "342",
      change: "Requires attention",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "orange",
    },
  ];

  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Welcome back, {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colorMap[stat.color as keyof typeof colorMap]}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex">
              {["overview", "users", "loans", "reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Platform Overview
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Chart Placeholder */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-64 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Member Growth Chart
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-64 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Loan Disbursement Trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  User Management
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    User management interface coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Loan Management
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Loan tracking interface coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Reports & Analytics
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Advanced reporting tools coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole={["admin", "super_admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

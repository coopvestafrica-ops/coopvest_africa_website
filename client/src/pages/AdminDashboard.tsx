import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Users, CreditCard, TrendingUp, AlertCircle, BarChart3, Settings, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "suspended";
  joinedDate: string;
  contributions: string;
}

interface Loan {
  id: string;
  member: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "active";
  type: string;
  date: string;
}

function AdminDashboardContent() {
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

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
      color: "emerald",
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
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  // Sample users data
  const users: User[] = [
    { id: "USR-001", name: "Akinola Ojo", email: "akinola@email.com", role: "member", status: "active", joinedDate: "2024-01-15", contributions: "$5,200" },
    { id: "USR-002", name: "Chioma Nwosu", email: "chioma@email.com", role: "member", status: "active", joinedDate: "2024-02-20", contributions: "$8,450" },
    { id: "USR-003", name: "Emeka Okonkwo", email: "emeka@email.com", role: "admin", status: "active", joinedDate: "2023-11-10", contributions: "$12,000" },
    { id: "USR-004", name: "Fatima Abdullahi", email: "fatima@email.com", role: "member", status: "pending", joinedDate: "2024-03-01", contributions: "$0" },
    { id: "USR-005", name: "Ibrahim Adeyemi", email: "ibrahim@email.com", role: "member", status: "active", joinedDate: "2024-01-28", contributions: "$3,750" },
    { id: "USR-006", name: "Joyce Ogundimu", email: "joyce@email.com", role: "member", status: "suspended", joinedDate: "2023-09-05", contributions: "$1,200" },
  ];

  // Sample loans data
  const loans: Loan[] = [
    { id: "LN-2024-001", member: "Akinola Ojo", amount: "$5,000", status: "approved", type: "Personal", date: "2024-03-10" },
    { id: "LN-2024-002", member: "Chioma Nwosu", amount: "$12,500", status: "pending", type: "Business", date: "2024-03-12" },
    { id: "LN-2024-003", member: "Emeka Okonkwo", amount: "$3,000", status: "active", type: "Emergency", date: "2024-02-28" },
    { id: "LN-2024-004", member: "Fatima Abdullahi", amount: "$8,000", status: "pending", type: "Education", date: "2024-03-14" },
    { id: "LN-2024-005", member: "Ibrahim Adeyemi", amount: "$2,500", status: "rejected", type: "Personal", date: "2024-03-08" },
    { id: "LN-2024-006", member: "Joyce Ogundimu", amount: "$15,000", status: "active", type: "Business", date: "2024-01-20" },
  ];

  const statusColors = {
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    approved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    rejected: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    active: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    suspended: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
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
              Welcome back, {user?.name || "Admin"}
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
                  {/* Member Growth Chart */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium text-slate-900 dark:text-white mb-4">Member Growth</h4>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {[35, 45, 55, 62, 78, 85, 92, 88, 95, 100, 110, 118].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Loan Disbursement Chart */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium text-slate-900 dark:text-white mb-4">Loan Disbursements</h4>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {[65, 72, 68, 80, 75, 88, 95, 90, 102, 115, 125, 135].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-emerald-500 dark:bg-emerald-600 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="mt-8">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {[
                      { action: "New member registered", user: "Fatima Abdullahi", time: "2 minutes ago", type: "user" },
                      { action: "Loan approved", user: "Akinola Ojo - $5,000", time: "15 minutes ago", type: "loan" },
                      { action: "Contribution received", user: "Chioma Nwosu - $500", time: "1 hour ago", type: "payment" },
                      { action: "KYC verified", user: "Ibrahim Adeyemi", time: "3 hours ago", type: "kyc" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{activity.user}</p>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    User Management
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-9 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">User ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Contributions</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((user) => (
                        <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{user.id}</td>
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                          <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400 capitalize">{user.role}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status as keyof typeof statusColors] || "bg-gray-100 text-gray-700"}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{user.contributions}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-8 h-8 text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Showing 1-6 of 50,234 users</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Loan Management
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Search loans..." 
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Loan ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Member</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan) => (
                        <tr key={loan.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{loan.id}</td>
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white font-medium">{loan.member}</td>
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-white font-medium">{loan.amount}</td>
                          <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{loan.type}</td>
                          <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{loan.date}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[loan.status as keyof typeof statusColors] || "bg-gray-100 text-gray-700"}`}>
                              {loan.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Showing 1-6 of 12,456 loans</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Reports & Analytics
                  </h3>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: "Monthly Summary", desc: "Overview of all activities", date: "March 2024" },
                    { title: "Loan Portfolio", desc: "Detailed loan analysis", date: "Q1 2024" },
                    { title: "Member Contributions", desc: "Contribution trends report", date: "March 2024" },
                    { title: "Financial Statements", desc: "Income & expenditure", date: "February 2024" },
                    { title: "Risk Assessment", desc: "Loan risk analysis", date: "March 2024" },
                    { title: "Compliance Report", desc: "Regulatory compliance status", date: "Q1 2024" },
                  ].map((report, i) => (
                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                      <h4 className="font-medium text-slate-900 dark:text-white">{report.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{report.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{report.date}</span>
                        <Download className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-4">Quick Stats Export</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <Button variant="outline" className="justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Member Statistics
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Loan Statistics
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Financial Summary
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh All Data
                    </Button>
                  </div>
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
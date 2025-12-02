import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Settings, Users, Lock, BarChart3, LogOut, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GlobalSetting {
  key: string;
  label: string;
  value: string | number | boolean;
  type: "text" | "number" | "toggle";
  description: string;
}

function SuperAdminPanelContent() {
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("settings");
  const [settings, setSettings] = useState<GlobalSetting[]>([
    {
      key: "interest_rate",
      label: "Default Interest Rate (%)",
      value: 8.5,
      type: "number",
      description: "Default annual interest rate for savings accounts",
    },
    {
      key: "loan_rate",
      label: "Loan Interest Rate (%)",
      value: 12.5,
      type: "number",
      description: "Default annual interest rate for loans",
    },
    {
      key: "contribution_cycle",
      label: "Contribution Cycle (Days)",
      value: 30,
      type: "number",
      description: "Number of days in a contribution cycle",
    },
    {
      key: "max_loan_amount",
      label: "Maximum Loan Amount ($)",
      value: 50000,
      type: "number",
      description: "Maximum loan amount a member can request",
    },
    {
      key: "mfa_enabled",
      label: "Multi-Factor Authentication",
      value: true,
      type: "toggle",
      description: "Require MFA for all admin accounts",
    },
    {
      key: "maintenance_mode",
      label: "Maintenance Mode",
      value: false,
      type: "toggle",
      description: "Temporarily disable platform access for maintenance",
    },
  ]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
  };

  const auditLogs = [
    { id: 1, action: "Interest rate updated", admin: "Amara Okonkwo", timestamp: "2024-10-28 14:30", details: "Changed from 8% to 8.5%" },
    { id: 2, action: "Admin account created", admin: "System", timestamp: "2024-10-27 10:15", details: "New admin: Kwame Mensah" },
    { id: 3, action: "Platform maintenance", admin: "Zainab Hassan", timestamp: "2024-10-26 22:00", details: "Scheduled maintenance completed" },
    { id: 4, action: "Security policy updated", admin: "Amara Okonkwo", timestamp: "2024-10-25 16:45", details: "MFA requirement enforced" },
    { id: 5, action: "Member suspension", admin: "Admin Team", timestamp: "2024-10-24 11:20", details: "Suspended 3 accounts for policy violation" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Super Admin Panel
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Platform control center • {user?.name}
            </p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="text-red-600 dark:text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Warning Alert */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
              Super Admin Access
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              You have full platform control. All changes are logged and auditable.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex">
              {[
                { id: "settings", label: "Global Settings", icon: Settings },
                { id: "admins", label: "Admin Accounts", icon: Users },
                { id: "security", label: "Security", icon: Lock },
                { id: "audit", label: "Audit Logs", icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Global Platform Settings
                </h3>
                <div className="space-y-4">
                  {settings.map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex-1">
                        <label className="font-medium text-slate-900 dark:text-white">
                          {setting.label}
                        </label>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {setting.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        {setting.type === "toggle" ? (
                          <button
                            onClick={() =>
                              handleSettingChange(setting.key, !setting.value)
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.value
                                ? "bg-blue-600"
                                : "bg-slate-300 dark:bg-slate-600"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                setting.value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        ) : (
                          <input
                            type={setting.type}
                            value={String(setting.value)}
                            onChange={(e) =>
                              handleSettingChange(
                                setting.key,
                                setting.type === "number"
                                  ? parseFloat(e.target.value)
                                  : e.target.value
                              )
                            }
                            className="w-32 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </div>
            )}

            {activeTab === "admins" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Admin Account Management
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Admin management interface coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Security Settings
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400">
                    Security configuration interface coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Audit Logs
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Action
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Admin
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Timestamp
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr
                          key={log.id}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">
                            {log.action}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                            {log.admin}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                            {log.timestamp}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                            {log.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SuperAdminPanel() {
  return (
    <ProtectedRoute requiredRole="super_admin">
      <SuperAdminPanelContent />
    </ProtectedRoute>
  );
}

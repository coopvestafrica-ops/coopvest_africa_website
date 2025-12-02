import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Shield, Copy, CheckCircle, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiService from "@/services/api";

function TwoFASetupContent() {
  const { user } = useAuthContext();
  const [step, setStep] = useState<"intro" | "setup" | "verify" | "backup" | "complete">("intro");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleStartSetup = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await apiService.setupTwoFA();
      if (response.success && response.data) {
        setQrCode(response.data.qrCode);
        setSecret(response.data.secret);
        setStep("setup");
      } else {
        setError(response.error || "Failed to start 2FA setup");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await apiService.confirmTwoFA(verificationCode);
      if (response.success && response.data) {
        setBackupCodes(response.data.backupCodes);
        setStep("backup");
      } else {
        setError(response.error || "Invalid verification code");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleComplete = () => {
    setStep("complete");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Two-Factor Authentication
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Secure your account with an additional layer of protection
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {["intro", "setup", "verify", "backup", "complete"].map((s, idx) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : ["setup", "verify", "backup", "complete"].includes(step) &&
                        ["setup", "verify", "backup", "complete"].indexOf(step) > idx
                      ? "bg-green-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {["setup", "verify", "backup", "complete"].includes(step) &&
                  ["setup", "verify", "backup", "complete"].indexOf(step) > idx ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    idx + 1
                  )}
                </div>
                {idx < 4 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      ["setup", "verify", "backup", "complete"].includes(step) &&
                      ["setup", "verify", "backup", "complete"].indexOf(step) > idx
                        ? "bg-green-600"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
            <span>Intro</span>
            <span>Setup</span>
            <span>Verify</span>
            <span>Backup</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Intro Step */}
        {step === "intro" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-start gap-6 mb-6">
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Enable Two-Factor Authentication
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Two-factor authentication (2FA) adds an extra layer of security to your account by requiring
                  a verification code in addition to your password when logging in.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Benefits of 2FA:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>✓ Protects your account even if your password is compromised</li>
                <li>✓ Prevents unauthorized access from unknown devices</li>
                <li>✓ Provides backup codes for emergency access</li>
                <li>✓ Industry-standard security practice</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                What You'll Need:
              </h3>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li>• A smartphone with an authenticator app (Google Authenticator, Authy, Microsoft Authenticator)</li>
                <li>• A safe place to store backup codes</li>
              </ul>
            </div>

            <Button
              onClick={handleStartSetup}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              {isLoading ? "Starting Setup..." : "Get Started"}
            </Button>
          </div>
        )}

        {/* Setup Step */}
        {step === "setup" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Scan QR Code
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Scan this QR code with your authenticator app:
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                  ) : (
                    <div className="w-64 h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      Loading...
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Entry */}
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Or enter this code manually:
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono text-slate-900 dark:text-white break-all">
                      {showSecret ? secret : "••••••••••••••••"}
                    </code>
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> Save this code in a secure location. You'll need it if you lose
                    access to your authenticator app.
                  </p>
                </div>

                <Button
                  onClick={() => setStep("verify")}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
                >
                  I've Scanned the Code
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Verify Your Code
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Enter the 6-digit code from your authenticator app:
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-3 text-center text-3xl font-mono border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 mb-6"
            />

            <Button
              onClick={handleVerify}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        )}

        {/* Backup Codes Step */}
        {step === "backup" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Save Your Backup Codes
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Keep these codes in a safe place. You can use them to access your account if you lose your authenticator device.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>⚠️ Important:</strong> Each code can only be used once. Store them securely and don't share them with anyone.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-3">
                {backupCodes.map((code, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700"
                  >
                    <code className="font-mono text-sm text-slate-900 dark:text-white">
                      {showBackupCodes ? code : "••••••••"}
                    </code>
                    <button
                      onClick={() => copyToClipboard(code, idx)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showBackupCodes ? "Hide" : "Show"} Codes
              </button>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
            >
              I've Saved My Backup Codes
            </Button>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Two-Factor Authentication Enabled
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your account is now protected with two-factor authentication. You'll be asked to enter a verification
              code when logging in from a new device.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                What's Next:
              </h3>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200 text-left">
                <li>✓ Your authenticator app is now synced with your account</li>
                <li>✓ You'll need your authenticator app to log in</li>
                <li>✓ Keep your backup codes safe for emergency access</li>
                <li>✓ You can manage 2FA settings in your account preferences</li>
              </ul>
            </div>

            <Button
              onClick={() => window.location.href = "/member/dashboard"}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TwoFASetup() {
  return (
    <ProtectedRoute requiredRole="member">
      <TwoFASetupContent />
    </ProtectedRoute>
  );
}

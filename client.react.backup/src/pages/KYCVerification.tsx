import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Upload, CheckCircle, AlertCircle, Clock, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiService from "@/services/api";

function KYCContent() {
  const { user } = useAuthContext();
  const [step, setStep] = useState<"status" | "upload" | "review">("status");
  const [kycStatus, setKycStatus] = useState<"pending" | "verified" | "rejected">("pending");
  const [formData, setFormData] = useState({
    documentType: "passport",
    documentNumber: "",
    dateOfBirth: "",
    documentImage: null as File | null,
    proofOfAddress: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "national_id", label: "National ID" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "voter_id", label: "Voter ID" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.documentNumber.trim()) newErrors.documentNumber = "Document number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.documentImage) newErrors.documentImage = "Identity document image is required";
    if (!formData.proofOfAddress) newErrors.proofOfAddress = "Proof of address is required";

    // Validate file sizes (max 5MB)
    if (formData.documentImage && formData.documentImage.size > 5 * 1024 * 1024) {
      newErrors.documentImage = "Document image must be less than 5MB";
    }
    if (formData.proofOfAddress && formData.proofOfAddress.size > 5 * 1024 * 1024) {
      newErrors.proofOfAddress = "Proof of address must be less than 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await apiService.submitKYC({
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        documentImage: formData.documentImage!,
        proofOfAddress: formData.proofOfAddress!,
        dateOfBirth: formData.dateOfBirth,
      });

      if (response.success) {
        setSuccess(true);
        setKycStatus("pending");
        setStep("status");
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setErrors({ submit: response.error || "Failed to submit KYC" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            KYC Verification
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Complete your identity verification to unlock all features
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">
                KYC submitted successfully!
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                Your documents are under review. We'll notify you once verification is complete.
              </p>
            </div>
          </div>
        )}

        {/* Status View */}
        {step === "status" && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {kycStatus === "verified" && (
                    <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
                  )}
                  {kycStatus === "pending" && (
                    <Clock className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  )}
                  {kycStatus === "rejected" && (
                    <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {kycStatus === "verified" && "Verification Complete"}
                    {kycStatus === "pending" && "Verification Pending"}
                    {kycStatus === "rejected" && "Verification Rejected"}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {kycStatus === "verified" &&
                      "Your identity has been verified. You can now access all features."}
                    {kycStatus === "pending" &&
                      "Your documents are being reviewed. This usually takes 1-2 business days."}
                    {kycStatus === "rejected" &&
                      "Your verification was rejected. Please resubmit with correct documents."}
                  </p>
                  {kycStatus !== "verified" && (
                    <Button
                      onClick={() => setStep("upload")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {kycStatus === "pending" ? "Update Documents" : "Submit Documents"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                KYC Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Valid Government ID</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Passport, National ID, Driver's License, or Voter ID
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Proof of Address</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Utility bill, bank statement, or government letter (dated within 3 months)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload View */}
        {step === "upload" && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-slate-200 dark:border-slate-800 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Document Type
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Document Number
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                  placeholder="e.g., A12345678"
                  className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.documentNumber ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  }`}
                />
                {errors.documentNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Document Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Identity Document Image
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "documentImage")}
                    className="hidden"
                    id="document-image"
                  />
                  <label htmlFor="document-image" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-medium text-slate-900 dark:text-white">
                      {formData.documentImage ? formData.documentImage.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      PNG, JPG, PDF up to 5MB
                    </p>
                  </label>
                </div>
                {errors.documentImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.documentImage}</p>
                )}
              </div>

              {/* Proof of Address Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Proof of Address
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "proofOfAddress")}
                    className="hidden"
                    id="proof-address"
                  />
                  <label htmlFor="proof-address" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-medium text-slate-900 dark:text-white">
                      {formData.proofOfAddress ? formData.proofOfAddress.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      PNG, JPG, PDF up to 5MB
                    </p>
                  </label>
                </div>
                {errors.proofOfAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.proofOfAddress}</p>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-200">{errors.submit}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("status")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Submitting..." : "Submit for Verification"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function KYCVerification() {
  return (
    <ProtectedRoute requiredRole="member">
      <KYCContent />
    </ProtectedRoute>
  );
}

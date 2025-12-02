import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-20 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Empower Your Financial Future
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Join Coopvest Africa – the modern cooperative investment platform designed for salaried workers and everyday people across Africa. Access savings, loans, and investment opportunities with transparency and trust.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg border-slate-300 dark:border-slate-600"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$2.5M</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Loans Disbursed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="space-y-3 pt-4">
                  <div className="h-12 bg-blue-100 dark:bg-slate-700 rounded"></div>
                  <div className="h-12 bg-blue-100 dark:bg-slate-700 rounded"></div>
                  <div className="h-12 bg-blue-100 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

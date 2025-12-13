import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-20 sm:py-32">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Empower Your Financial Future
              </h1>
              <p 
                className={`text-lg text-slate-600 dark:text-slate-300 transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Join Coopvest Africa – the modern cooperative investment platform designed for salaried workers and everyday people across Africa. Access savings, loans, and investment opportunities with transparency and trust.
              </p>
            </div>

            {/* CTA Buttons with hover animations */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              >
                Get Started 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg border-slate-300 dark:border-slate-600 group transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:shadow-lg hover:scale-105"
              >
                Learn More
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
              {[
                { value: "50K+", label: "Active Members" },
                { value: "$2.5M", label: "Loans Disbursed" },
                { value: "98%", label: "Satisfaction Rate" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-1000 hover:scale-110 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image with floating animation */}
          <div 
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <picture>
                <source srcSet="/images/hero-section.webp" type="image/webp" />
                <img
                  src="/images/hero-section.png"
                  alt="Coopvest Africa Team - Professional Financial Collaboration"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </picture>
            </div>
            {/* Floating accent elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-400 rounded-full opacity-20 blur-2xl animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
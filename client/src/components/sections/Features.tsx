const features = [
  {
    image: "/images/feature-savings-pools.png",
    title: "Savings Pools",
    description: "Build your wealth through flexible, interest-bearing savings accounts with competitive rates.",
    icon: "💰",
  },
  {
    image: "/images/feature-smart-loans.png",
    title: "Smart Loans",
    description: "Access quick, affordable loans with transparent terms and flexible repayment schedules.",
    icon: "📊",
  },
  {
    image: "/images/feature-investments.png",
    title: "Investment Opportunities",
    description: "Grow your money through carefully curated investment pools and diversified portfolios.",
    icon: "📈",
  },
  {
    image: "/images/feature-secure.png",
    title: "Secure & Transparent",
    description: "Bank-level security with full transparency in all transactions and operations.",
    icon: "🔒",
  },
  {
    image: "/images/feature-transactions.png",
    title: "Instant Transactions",
    description: "Fast, seamless deposits, withdrawals, and transfers at your fingertips.",
    icon: "⚡",
  },
  {
    image: "/images/feature-protection.png",
    title: "Member Protection",
    description: "Your funds are protected with comprehensive insurance and regulatory compliance.",
    icon: "🛡️",
  },
];

import { useEffect, useState } from "react";

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-index]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 sm:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with animation */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
              ✨ Our Services
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Designed to meet all your savings, lending, and investment needs with innovative features and exceptional service.
          </p>
        </div>

        {/* Features Grid with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isVisible = visibleCards.has(index);
            return (
              <div
                key={index}
                data-index={index}
                className={`group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 transition-all duration-700 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-500 pointer-events-none"></div>

                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/50 dark:group-hover:border-blue-500/50 transition-all duration-500 pointer-events-none"></div>

                {/* Icon with animation */}
                <div className="relative mb-6 inline-block">
                  <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                </div>

                {/* Image container with hover effect */}
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6 overflow-hidden group-hover:shadow-lg transition-all duration-500 relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated arrow indicator */}
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
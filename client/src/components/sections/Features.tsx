import { Users, TrendingUp, Lock, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Savings Pools",
    description: "Build your wealth through flexible, interest-bearing savings accounts with competitive rates.",
  },
  {
    icon: TrendingUp,
    title: "Smart Loans",
    description: "Access quick, affordable loans with transparent terms and flexible repayment schedules.",
  },
  {
    icon: BarChart3,
    title: "Investment Opportunities",
    description: "Grow your money through carefully curated investment pools and diversified portfolios.",
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Bank-level security with full transparency in all transactions and operations.",
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Fast, seamless deposits, withdrawals, and transfers at your fingertips.",
  },
  {
    icon: Shield,
    title: "Member Protection",
    description: "Your funds are protected with comprehensive insurance and regulatory compliance.",
  },
];

export default function Features() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive financial solutions designed to meet all your savings, lending, and investment needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 bg-slate-50 dark:bg-slate-900/50"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

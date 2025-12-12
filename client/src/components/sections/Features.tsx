const features = [
  {
    image: "/images/feature-savings-pools.png",
    title: "Savings Pools",
    description: "Build your wealth through flexible, interest-bearing savings accounts with competitive rates.",
  },
  {
    image: "/images/feature-smart-loans.png",
    title: "Smart Loans",
    description: "Access quick, affordable loans with transparent terms and flexible repayment schedules.",
  },
  {
    image: "/images/feature-investments.png",
    title: "Investment Opportunities",
    description: "Grow your money through carefully curated investment pools and diversified portfolios.",
  },
  {
    image: "/images/feature-secure.png",
    title: "Secure & Transparent",
    description: "Bank-level security with full transparency in all transactions and operations.",
  },
  {
    image: "/images/feature-transactions.png",
    title: "Instant Transactions",
    description: "Fast, seamless deposits, withdrawals, and transfers at your fingertips.",
  },
  {
    image: "/images/feature-protection.png",
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
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 bg-slate-50 dark:bg-slate-900/50"
              >
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4 overflow-hidden group-hover:shadow-md transition-shadow">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
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

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your account in minutes with just your basic information. Secure and simple.",
    image: "/images/process-step-1-signup.png",
  },
  {
    number: 2,
    title: "Start Saving",
    description: "Join savings pools and start building wealth with competitive interest rates.",
    image: "/images/process-step-2-savings.png",
  },
  {
    number: 3,
    title: "Access Loans",
    description: "Get quick approval for loans with transparent terms and flexible repayment options.",
    image: "/images/process-step-3-loans.png",
  },
  {
    number: 4,
    title: "Grow Your Wealth",
    description: "Watch your investments grow through our curated investment pools and opportunities.",
    image: "/images/process-step-4-growth.png",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get started with Coopvest Africa in just four simple steps. Join thousands of members already transforming their financial lives.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 h-full border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Step Image */}
                <div className="w-full h-40 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4 overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Ready to start your financial journey?
          </p>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Get Started Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

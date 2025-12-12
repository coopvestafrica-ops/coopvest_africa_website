export default function AppShowcase() {
  const screenshots = [
    {
      title: "Dashboard",
      description: "View your account balance, recent transactions, and quick actions at a glance.",
      image: "/images/app-screenshot-dashboard.png",
    },
    {
      title: "Loan Application",
      description: "Apply for loans with a simple, intuitive form. Get approved in minutes.",
      image: "/images/app-screenshot-loans.png",
    },
    {
      title: "Savings Pools",
      description: "Track your savings growth and explore investment opportunities.",
      image: "/images/app-screenshot-savings.png",
    },
  ];

  return (
    <section id="app" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Experience the App
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our mobile app puts financial control in your hands. Manage your savings, loans, and investments anytime, anywhere.
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Screenshot Image */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 overflow-hidden">
                <img
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {screenshot.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {screenshot.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Download the Coopvest Africa app today and start your financial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c-.91 0-1.64.75-1.64 1.68s.73 1.68 1.64 1.68 1.64-.75 1.64-1.68-.73-1.68-1.64-1.68zM16.56 5.96h-1.31V4.05h1.31v1.91zm-4.08 11.4c-.9 0-1.64.75-1.64 1.68s.74 1.68 1.64 1.68 1.64-.75 1.64-1.68-.74-1.68-1.64-1.68z" />
              </svg>
              Download on Google Play
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c-.91 0-1.64.75-1.64 1.68s.73 1.68 1.64 1.68 1.64-.75 1.64-1.68-.73-1.68-1.64-1.68zM16.56 5.96h-1.31V4.05h1.31v1.91zm-4.08 11.4c-.9 0-1.64.75-1.64 1.68s.74 1.68 1.64 1.68 1.64-.75 1.64-1.68-.74-1.68-1.64-1.68z" />
              </svg>
              Download on App Store
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Image Section with animation */}
        <div 
          className={`mb-12 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative overflow-hidden">
            <picture>
              <source srcSet="/images/cta-banner.webp" type="image/webp" />
              <img
                src="/images/cta-banner.png"
                alt="Empowering Your Financial Journey"
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Newsletter Section with enhanced animations */}
        <div 
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 sm:p-12 relative overflow-hidden transition-all duration-1000 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white animate-pulse"></div>
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-block mb-2">
                <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
                  📬 Newsletter
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Stay Updated with Financial Tips
              </h2>
              <p className="text-lg text-blue-100">
                Get exclusive insights, investment opportunities, and financial tips delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-2 group">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:bg-white/20"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg px-6 font-semibold group transition-all duration-300 hover:shadow-lg hover:shadow-white/50 hover:scale-105"
                >
                  <span className="group-hover:hidden">Subscribe</span>
                  <ArrowRight className="w-5 h-5 hidden group-hover:inline group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              {subscribed && (
                <div className="text-green-100 text-sm mt-3 flex items-center justify-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thanks for subscribing! Check your email for confirmation.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
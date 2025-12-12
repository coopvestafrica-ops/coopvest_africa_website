import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Image Section */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <picture>
  <source srcset="/images/cta-banner.webp" type="image/webp">
  <img src="/images/cta-banner.png"
            alt="Empowering Your Financial Journey"
            className="w-full h-auto object-cover"
          />
</picture>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Stay Updated with Financial Tips
              </h2>
              <p className="text-lg text-blue-100">
                Get exclusive insights, investment opportunities, and financial
                tips delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg px-6 font-semibold"
                >
                  Subscribe
                </Button>
              </div>
              {subscribed && (
                <p className="text-green-100 text-sm mt-2">
                  ✓ Thanks for subscribing! Check your email for confirmation.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="contact" className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of Africans building wealth through Coopvest. Start your journey today with zero hidden fees and transparent operations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2"
            >
              Open Account Now <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-lg"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Newsletter Section */}
          <div className="pt-12 border-t border-blue-400/30">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated with Financial Tips
            </h3>
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
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg px-6"
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

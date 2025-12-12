import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Amara Okonkwo",
    role: "Small Business Owner",
    location: "Lagos, Nigeria",
    content: "Coopvest Africa has transformed my business finances. The loan process was seamless and the interest rates are unbeatable. Highly recommended!",
    rating: 5,
    image: "/images/testimonial-member-1.png",
  },
  {
    name: "Kwame Mensah",
    role: "Salaried Professional",
    location: "Accra, Ghana",
    content: "I've been saving with Coopvest for 2 years now. The platform is secure, transparent, and my savings have grown significantly with competitive interest rates.",
    rating: 5,
    image: "/images/testimonial-member-2.png",
  },
  {
    name: "Zainab Hassan",
    role: "Entrepreneur",
    location: "Nairobi, Kenya",
    content: "The investment pools offered by Coopvest are fantastic. I've diversified my portfolio and the returns have exceeded my expectations.",
    rating: 5,
    image: "/images/testimonial-member-3.png",
  },
  {
    name: "Chidi Nwosu",
    role: "Teacher",
    location: "Enugu, Nigeria",
    content: "As an educator, I appreciate the financial literacy resources Coopvest provides. The platform made it easy for me to save for my children's education.",
    rating: 5,
    image: "/images/testimonial-member-1.png",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Member Success Stories
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Hear from our members about how Coopvest Africa has transformed their financial lives.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 sm:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-900 dark:text-white mb-8 italic">
              "{current.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <img 
                src={current.image} 
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {current.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {current.role} • {current.location}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={prev}
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={next}
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex
                        ? "bg-blue-600 w-8"
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                {currentIndex + 1} / {testimonials.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
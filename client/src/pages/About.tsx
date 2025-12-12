import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white">
              About Coopvest Africa
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Bridging the gap between traditional cooperative systems and modern financial technology to empower millions of Africans.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Our Story
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Coopvest Africa was founded with a simple mission: to democratize access to financial services across Africa. We recognized that millions of hardworking salaried workers and entrepreneurs lacked access to affordable credit, secure savings options, and investment opportunities.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                By combining the trust and community-driven values of traditional cooperatives with cutting-edge financial technology, we've created a platform that serves the unique needs of African communities.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
              <img 
                src="/images/about-team.png" 
                alt="Coopvest Africa Team - Diverse professionals collaborating"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                To empower salaried workers and ordinary people across Africa by providing accessible, transparent, and affordable financial services that promote savings, lending, and investment opportunities within trusted cooperative communities.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                To become the leading digital cooperative platform in Africa, transforming how millions of people save, borrow, and invest, while building sustainable wealth and financial security for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Trust",
                description: "We build trust through transparency, security, and consistent delivery on our promises.",
              },
              {
                title: "Community",
                description: "We believe in the power of communities working together to achieve financial goals.",
              },
              {
                title: "Innovation",
                description: "We leverage technology to solve real financial challenges faced by everyday Africans.",
              },
              {
                title: "Inclusion",
                description: "We're committed to financial inclusion for everyone, regardless of background or location.",
              },
              {
                title: "Integrity",
                description: "We operate with the highest ethical standards and regulatory compliance.",
              },
              {
                title: "Growth",
                description: "We're dedicated to helping our members grow their wealth and achieve their dreams.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-16">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Amara Okonkwo",
                role: "Chief Executive Officer",
                bio: "Visionary leader with 15+ years in fintech and cooperative finance.",
              },
              {
                name: "Kwame Mensah",
                role: "Chief Technology Officer",
                bio: "Tech innovator passionate about building scalable financial solutions.",
              },
              {
                name: "Zainab Hassan",
                role: "Chief Operations Officer",
                bio: "Operations expert with deep experience in African financial services.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the financial revolution transforming Africa.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2 mx-auto"
          >
            Get Started Today <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
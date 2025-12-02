import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Coopvest Africa?",
    answer: "Coopvest Africa is a modern digital cooperative and investment platform that empowers salaried workers and ordinary people across Africa with access to savings, loans, and investment opportunities. We blend traditional cooperative systems with technology to promote financial inclusion and growth.",
  },
  {
    question: "How do I open a savings account?",
    answer: "Opening a savings account is simple! Sign up on our platform, complete the verification process, and you can start saving immediately. Your account will earn competitive interest rates, and you can manage everything from your dashboard.",
  },
  {
    question: "What are the loan eligibility requirements?",
    answer: "To qualify for a loan, you need to be an active member with a minimum savings balance, have a good repayment history, and meet our income requirements. The exact criteria depend on the loan type you're applying for.",
  },
  {
    question: "How long does it take to get a loan approval?",
    answer: "Most loan applications are reviewed within 24-48 hours. Once approved, funds are disbursed directly to your account within 1-2 business days. Urgent applications may be processed faster.",
  },
  {
    question: "Are my funds safe with Coopvest?",
    answer: "Yes, absolutely. We use bank-level security, encryption standards, and comprehensive insurance coverage. All member funds are protected, and we comply with all regulatory requirements.",
  },
  {
    question: "What investment options are available?",
    answer: "We offer diversified investment pools including fixed-income instruments, equity funds, and mixed portfolios. Each pool has different risk profiles and return expectations to suit various investor preferences.",
  },
  {
    question: "Can I withdraw my savings anytime?",
    answer: "Yes, you can withdraw your savings anytime. However, early withdrawals from certain investment products may have specific terms. Regular savings accounts allow penalty-free withdrawals.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team via email, phone, live chat, or through the in-app chatbot. We're available 24/7 to assist with any questions or concerns.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
      >
        <span className="font-semibold text-slate-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Find answers to common questions about Coopvest Africa.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why do I need to verify my identity?",
      answer: "Verification ensures that only genuine BRACU students and alumni can access our platform, maintaining the quality and security of our community."
    },
    {
      question: "What if I don't have a BRACU email?",
      answer: "Alumni can verify using their graduation certificate, alumni card, or student ID. Our admin team will manually review and approve your request."
    },
    {
      question: "How long does verification take?",
      answer: "Student email verification is instant. Alumni document verification typically takes 24-48 hours during business days."
    },
    {
      question: "What happens after verification?",
      answer: "Once verified, you'll gain full access to GradLink's features including alumni connections, project collaborations, mentorship opportunities, and career resources."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-5 max-w-screen-xl mx-auto lg:px-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
        <p className="text-gray-400">
          Common questions about the verification process
        </p>
      </div>

      <div className=" space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-[#1E293B] border border-[#334155]">
            <input
              type="radio"
              name="faq-accordion"
              checked={openIndex === index}
              onChange={() => toggleFAQ(index)}
            />
            <div className="collapse-title md:text-lg  font-medium text-white">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
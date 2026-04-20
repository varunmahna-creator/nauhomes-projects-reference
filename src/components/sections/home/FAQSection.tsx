import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const midpoint = Math.ceil(FAQS.length / 2);
  const leftColumn = FAQS.slice(0, midpoint);
  const rightColumn = FAQS.slice(midpoint);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <SectionWrapper id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">FAQ</span>
        <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Frequently Asked Questions</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        <p className="mx-auto mt-4 max-w-2xl text-muted">Everything you need to know about working with us</p>
      </div>
      <div className="hidden gap-5 lg:grid lg:grid-cols-2">
        <div className="space-y-4">{leftColumn.map((faq) => (<Accordion key={faq.question} question={faq.question} answer={faq.answer} />))}</div>
        <div className="space-y-4">{rightColumn.map((faq) => (<Accordion key={faq.question} question={faq.question} answer={faq.answer} />))}</div>
      </div>
      <div className="space-y-4 lg:hidden">
        {FAQS.map((faq) => (<Accordion key={faq.question} question={faq.question} answer={faq.answer} />))}
      </div>
    </SectionWrapper>
  );
}

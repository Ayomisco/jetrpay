const faqs = [
  {
    question: "How can I get started?",
    answer: "Download the Kredete app and sign up in seconds."
  },
  {
    question: "Which countries can I send money to using Kredete?",
    answer: "You can send money to over 15 countries in Africa."
  },
  {
    question: "How does Kredete calculate my credit score?",
    answer: "Your credit score is built every time you send money and maintain good financial habits."
  },
  {
    question: "Are there any fees associated with sending money on Kredete?",
    answer: "Enjoy competitive rates and transparent fees. Currency conversion is free across 20+ currencies."
  },
  {
    question: "How long does it take to see an improvement in my credit score?",
    answer: "You can see improvements as you continue to use the platform for transactions."
  }
];

export default function FAQSection() {
  return (
    <section className="faq">
      <h2>Do you have Questions? We have answers</h2>
      <ul>
        {faqs.map((faq, i) => (
          <li key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

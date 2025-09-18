const testimonials = [
  {
    name: "Khadijat Bakare",
    text: "Signing up to the app was quite easy and straightforward. The UI is minimal and clean. Finding my way around is effortless. And the app has proven useful. I now know what my credit score is. Looking forward for more features to be released."
  },
  {
    name: "Igor Bogor",
    text: "Just downloaded Kredete and am impressed with how simple the app is and how easy they make it to build and manage credit for consumers in Africa!"
  },
  {
    name: "Treasure Osa",
    text: "Signing up on Kredete was extremely easy and fast, KYC verification was also stress-free, and the app is super authentic and convenient to use."
  },
  {
    name: "Osoja Bukunmi",
    text: "I am usually not a fan of online loan or microfinance apps. But it feels surreal to find an app that can connect a borrower (like me) to potential lenders. I like how the Kredete app makes many things easy at a time. I can save, make USD transactions and still get an online card too… wow!!! I love this innovation… feels like something that should work only in the US… but I’m glad it’s already working here in Nigeria. Lovely to see!"
  },
  {
    name: "Abdulrazak Hajiya RASHIDA",
    text: "Seriously my son introduced me to this kredete application and it's been very good for my transaction. Kudos 👍"
  },
  {
    name: "Omotayo Clinton",
    text: "My friend who stays abroad used to tell me about how helpful credit scores can be to secure loans. I’ve been hoping that a platform that can help me build my credit score and secure a wider range of loans could be created and I’m glad Kredete came just at the right time. Okayyy, so I can now run my business with more loan opportunities. It’s a great stuff all the wayyyy!!!"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials">
      <h2>Don’t take our words for it, our users love us</h2>
      <div className="testimonial-list">
        {testimonials.map((t, i) => (
          <blockquote key={i}>
            <p>“{t.text}”</p>
            <footer>- {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

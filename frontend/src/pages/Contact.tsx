import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail size={20} strokeWidth={2} />,
    label: "Email us",
    value: "support@shoply.com",
    href: "mailto:support@shoply.com",
  },
  {
    icon: <Phone size={20} strokeWidth={2} />,
    label: "Call us",
    value: "+1 (234) 567-890",
    href: "tel:+12345678900",
  },
  {
    icon: <MapPin size={20} strokeWidth={2} />,
    label: "Visit us",
    value: "123 Commerce St, San Francisco, CA 94102",
    href: null,
  },
  {
    icon: <Clock size={20} strokeWidth={2} />,
    label: "Business hours",
    value: "Mon – Fri, 9 AM – 6 PM PST",
    href: null,
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // UI-only form — no backend endpoint exists for contact submissions.
    // In a production environment this would POST to an API or email service.
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* ── Page header ── */}
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="eyebrow">Contact</span>
        <h1>We'd love to hear from you.</h1>
        <p>
          Have a question about an order, a product, or just want to say hello?
          Fill out the form or reach us directly using the contact details below.
        </p>
      </motion.section>

      {/* ── Two-column layout ── */}
      <section className="contact-body">
        {/* Info column */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>Contact Information</h2>
          <p className="contact-info-sub">
            Our support team is available Monday through Friday and typically responds within one
            business day.
          </p>
          <ul className="contact-info-list">
            {contactInfo.map((item) => (
              <li key={item.label} className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="contact-info-copy">
                  <span className="contact-info-label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="contact-info-value contact-info-link">
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-info-value">{item.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form column */}
        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {submitted ? (
            <div className="contact-success">
              <CheckCircle size={44} strokeWidth={1.5} className="contact-success-icon" />
              <h3>Message received!</h3>
              <p>
                Thanks for reaching out. This is a UI-only demo — in a production build your
                message would be delivered to our support team. We'll be in touch shortly.
              </p>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
             
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="cf-name">Full Name</label>
                    <input
                      id="cf-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="cf-email">Email Address</label>
                    <input
                      id="cf-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="cf-subject">Subject</label>
                  <input
                    id="cf-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--lg contact-submit-btn">
                  <Send size={16} strokeWidth={2} />
                  Send Message
                </button>
              </form>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
}

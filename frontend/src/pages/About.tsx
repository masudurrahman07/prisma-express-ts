import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Truck, Star, HeartHandshake, Users, Package, ShoppingBag, Award } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products Listed" },
  { value: "50+", label: "Categories" },
  { value: "99%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    title: "Trusted Quality",
    desc: "Every product is carefully reviewed before being listed. We stand behind what we sell.",
  },
  {
    icon: <Truck size={22} strokeWidth={2} />,
    title: "Fast Delivery",
    desc: "Order processing starts the moment you checkout. Reliable shipping, every time.",
  },
  {
    icon: <HeartHandshake size={22} strokeWidth={2} />,
    title: "Customer First",
    desc: "From browsing to checkout, our experience is designed around you.",
  },
  {
    icon: <Star size={22} strokeWidth={2} />,
    title: "Curated Selection",
    desc: "We don't just list everything. We select products that actually deliver value.",
  },
];

const features = [
  {
    icon: <Users size={20} strokeWidth={2} />,
    title: "Built for Everyone",
    desc: "Shoply is designed to be intuitive for all kinds of shoppers — from first-timers to regulars.",
  },
  {
    icon: <Package size={20} strokeWidth={2} />,
    title: "Organized Catalog",
    desc: "Products are cleanly categorized and easy to browse, filter, and find quickly.",
  },
  {
    icon: <ShoppingBag size={20} strokeWidth={2} />,
    title: "Seamless Cart",
    desc: "Your cart persists across sessions. Add items, come back later, and check out when ready.",
  },
  {
    icon: <Award size={20} strokeWidth={2} />,
    title: "Order Tracking",
    desc: "Every order is tracked and stored in your account. Know exactly what you've purchased.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* ── Page Hero ── */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Our Story</span>
          <h1>Shopping made simple, powerful, and enjoyable.</h1>
          <p>
            Shoply was built to prove that e-commerce doesn't have to be noisy or complicated.
            A clean UI, real products, and a checkout flow that just works.
          </p>
          <Link to="/products" className="btn btn--primary btn--lg">
            Explore Products
          </Link>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <section className="about-stats-strip">
        <div className="about-stats-inner">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="about-stat"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <strong className="about-stat-value">{stat.value}</strong>
              <span className="about-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-section">
        <div className="about-section-inner about-mission-grid">
          <motion.div
            className="about-mission-copy"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Our Mission</span>
            <h2>We believe great shopping starts with great design.</h2>
            <p>
              Too many e-commerce platforms are cluttered, slow, and hard to navigate.
              Shoply is a response to that — a modern storefront that treats users with respect.
              Clear layouts, honest product information, and a checkout flow that doesn't get in your way.
            </p>
            <p>
              Whether you're browsing for the first time or a returning customer managing orders,
              every interaction is crafted to feel smooth and purposeful.
            </p>
          </motion.div>
          <motion.div
            className="about-mission-visual"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="about-mission-card">
              <span className="eyebrow">Since 2024</span>
              <strong>A portfolio-grade e-commerce project</strong>
              <p>
                Built with React, TypeScript, Prisma, and Express. A full-stack demonstration
                of professional frontend and backend development practices.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="about-section about-section--alt">
        <div className="about-section-inner">
          <div className="about-section-header">
            <span className="eyebrow">Why Choose Us</span>
            <h2>What sets Shoply apart</h2>
          </div>
          <div className="about-values-grid">
            {values.map((item, i) => (
              <motion.article
                key={item.title}
                className="about-value-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="about-value-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="about-section">
        <div className="about-section-inner">
          <div className="about-section-header">
            <span className="eyebrow">Platform Highlights</span>
            <h2>Everything built with intention</h2>
          </div>
          <div className="about-features-grid">
            {features.map((item, i) => (
              <motion.article
                key={item.title}
                className="about-feature-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="about-feature-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <motion.div
          className="about-cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <span className="eyebrow">Ready to shop?</span>
          <h2>Browse our full product catalog today.</h2>
          <p>
            From electronics to everyday essentials — find what you need,
            add it to your cart, and check out in seconds.
          </p>
          <div className="about-cta-actions">
            <Link to="/products" className="btn btn--primary btn--lg">
              Browse Products
            </Link>
            <Link to="/contact" className="btn btn--outline btn--lg">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, Zap, DollarSign, Clock, Users } from 'lucide-react';

export function WhyChoose() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const reasons = [
    {
      icon: CheckCircle2,
      title: 'Custom Solutions',
      description: 'Every project is tailored to your specific requirements and business objectives.'
    },
    {
      icon: Zap,
      title: 'Modern Technologies',
      description: 'We use cutting-edge tech stacks to build future-proof, scalable solutions.'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Competitive rates without compromising on quality or functionality.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'We respect deadlines and deliver projects within the agreed timeline.'
    },
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Specialized support for university projects with full documentation and guidance.'
    }
  ];

  return (
    <section id="why-choose" className="section why-choose-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why Partner With Us</span>
          <h2 className="section-title">Why Choose NEONX</h2>
          <p className="section-description">
            We deliver excellence through innovation, dedication, and customer-centric approach
          </p>
        </motion.div>

        <div className="why-choose-grid">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="glass-card why-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="why-icon">
                <reason.icon size={36} />
                <div className="icon-glow" />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

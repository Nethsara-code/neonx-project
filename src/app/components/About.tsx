import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Eye, Zap } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver requirement-based, customer-focused software development solutions that empower businesses and students with modern technology.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the leading software development partner for businesses and educational institutions, driving innovation through cutting-edge solutions.'
    },
    {
      icon: Zap,
      title: 'Our Approach',
      description: 'We combine futuristic technology with practical solutions, ensuring every project is tailored to meet specific client needs and objectives.'
    }
  ];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">About NEONX</h2>
          <p className="section-description">
            We are a next-generation software development company specializing in custom business systems, 
            web and mobile applications, and university-level software projects. Our mission is to transform 
            ideas into powerful digital solutions.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card feature-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="feature-icon">
                <feature.icon size={32} />
                <div className="icon-glow" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

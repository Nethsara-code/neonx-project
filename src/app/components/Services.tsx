import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Globe, Smartphone, Building2, GraduationCap, Sparkles } from 'lucide-react';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Building2,
      title: 'Custom Business Software Systems',
      description: 'Tailored enterprise solutions that streamline your operations and boost productivity with cutting-edge technology.',
      gradient: 'cyan'
    },
    {
      icon: Globe,
      title: 'Website Design & Development',
      description: 'Modern, responsive websites that captivate your audience and deliver exceptional user experiences.',
      gradient: 'purple'
    },
    {
      icon: Code,
      title: 'Web Applications',
      description: 'Full-stack web applications built with the latest frameworks for scalability and performance.',
      gradient: 'pink'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for Android and iOS that engage users on the go.',
      gradient: 'cyan'
    },
    {
      icon: Sparkles,
      title: 'Custom Software Solutions',
      description: 'Requirement-based software development tailored to your unique business needs and challenges.',
      gradient: 'purple'
    },
    {
      icon: GraduationCap,
      title: 'University Software Projects',
      description: 'Complete final-year and academic projects with documentation, reports, and code explanation guidance.',
      gradient: 'pink'
    }
  ];

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-description">
            Comprehensive software solutions designed to bring your vision to life
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`glass-card service-card gradient-${service.gradient}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="service-icon">
                <service.icon size={40} />
                <div className="icon-glow" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="card-border" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

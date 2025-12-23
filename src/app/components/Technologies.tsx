import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const technologies = [
    { name: 'React', category: 'Frontend', color: '#61DAFB' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Python', category: 'Backend', color: '#3776AB' },
    { name: 'Java', category: 'Backend', color: '#007396' },
    { name: 'Flutter', category: 'Mobile', color: '#02569B' },
    { name: 'Firebase', category: 'Backend', color: '#FFCA28' },
    { name: 'MySQL', category: 'Database', color: '#4479A1' },
    { name: 'MongoDB', category: 'Database', color: '#47A248' },
    { name: 'PostgreSQL', category: 'Database', color: '#4169E1' },
    { name: 'TypeScript', category: 'Language', color: '#3178C6' },
    { name: 'Express', category: 'Backend', color: '#000000' },
    { name: 'Angular', category: 'Frontend', color: '#DD0031' },
    { name: 'Vue.js', category: 'Frontend', color: '#4FC08D' },
    { name: 'Spring Boot', category: 'Backend', color: '#6DB33F' },
    { name: 'Docker', category: 'DevOps', color: '#2496ED' },
    { name: 'AWS', category: 'Cloud', color: '#FF9900' }
  ];

  return (
    <section id="technologies" className="section technologies-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Tech Stack</span>
          <h2 className="section-title">Technologies We Use</h2>
          <p className="section-description">
            Cutting-edge technologies powering next-generation software solutions
          </p>
        </motion.div>

        {/* Animated grid background */}
        <div className="tech-grid-background">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="grid-line"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="glass-card tech-card"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
            >
              <div className="tech-hexagon">
                <svg viewBox="0 0 100 100" className="hexagon-svg">
                  <defs>
                    <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#00f0ff', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                    fill={`url(#grad-${index})`}
                    fillOpacity="0.1"
                    stroke={tech.color}
                    strokeWidth="2"
                  />
                </svg>
                <span className="tech-name">{tech.name}</span>
              </div>
              <span className="tech-category">{tech.category}</span>
              <div className="tech-glow" style={{ backgroundColor: tech.color }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tech-cta glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Need a Different Technology?</h3>
          <p>We're always expanding our tech stack. Let us know your requirements!</p>
          <button className="cta-button primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Discuss Your Project
            <div className="button-glow" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

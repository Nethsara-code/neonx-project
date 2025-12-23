import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section" ref={ref}>
      <motion.div className="hero-content" style={{ opacity, scale }}>
        {/* Animated background grid */}
        <div className="cyber-grid" />
        
        {/* Floating neon shapes */}
        <div className="neon-shapes">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="neon-shape"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>

        {/* Energy lines */}
        <div className="energy-lines">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="energy-line"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.4
              }}
              style={{
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="hero-text-container">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles size={16} />
            <span>Next-Generation Software Solutions</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="neon-text">NEONX</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Building Neon-Powered Software Solutions for the Future
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Custom business software, web & mobile applications, and university-level 
            software projects built with cutting-edge technology
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button className="cta-button primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get a Quote
              <div className="button-glow" />
            </button>
            <button className="cta-button secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Services
              <div className="button-glow" />
            </button>
          </motion.div>
        </div>

        <motion.button
          className="scroll-indicator"
          onClick={scrollToNext}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>

      {/* Parallax background layers */}
      <motion.div className="parallax-layer layer-1" style={{ y }} />
      <motion.div className="parallax-layer layer-2" style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }} />
    </section>
  );
}

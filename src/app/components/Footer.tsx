import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Instagram, Facebook, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    { label: 'Business Software', href: '#services' },
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile Apps', href: '#services' },
    { label: 'University Projects', href: '#university' },
    { label: 'AI Solution', href: '#services' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <motion.div
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
            >
              <span className="logo-text">NEONX</span>
              <div className="logo-glow" />
            </motion.div>
            <p className="footer-tagline">
              Building Neon-Powered Software Solutions for the Future
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                  <div className="social-glow" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => scrollToSection(link.href)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                {services.map((service) => (
                  <li key={service.label}>
                    <button onClick={() => scrollToSection(service.href)}>
                      {service.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:hello@neonx.dev">info.neonxdev@gmail.com</a>
                </li>
                <li>
                  <a href="tel:+15551234567">+94 74 368 5240 <br/>+94 75 467 1921</a>
                </li>
                <li>
                  <span>Colombo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider" />
          <div className="footer-copyright">
            <p>
              © {currentYear} NEONX. All rights reserved.
            </p>
            <p className="made-with">
              Made with <Heart size={16} className="heart-icon" /> by NEONX Team
            </p>
          </div>
        </div>
      </div>

      {/* Animated footer background */}
      <div className="footer-background">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="footer-orb"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${i * 20}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </footer>
  );
}

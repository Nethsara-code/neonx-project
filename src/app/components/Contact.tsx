import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, MapPin, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'YOUR_SERVICE_ID', // replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID', // replace with your EmailJS Template ID
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      },
      'YOUR_PUBLIC_KEY' // replace with your EmailJS Public Key
    ).then(
      () => {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      },
      (error) => {
        console.error('Email send error:', error);
        alert('Oops! Something went wrong. Please try again later.');
      }
    );
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info.neonxdev@gmail.com', href: 'mailto:info.neonxdev@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 74 368 5240', href: 'tel:+94 74 368 5240' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+94 74 368 5240', href: 'https://wa.me/+94743685240' },
    { icon: MapPin, label: 'Location', value: 'Colombo', href: '#' }
  ];

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Neon</h2>
          <p className="section-description">
            Ready to transform your ideas into reality? Contact us today
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card contact-info-card">
              <h3>Contact Information</h3>
              <p>Reach out to us through any of these channels</p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="contact-info-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="contact-icon">
                      <info.icon size={24} />
                      <div className="icon-glow" />
                    </div>
                    <div>
                      <span className="contact-label">{info.label}</span>
                      <span className="contact-value">{info.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form className="glass-card contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Required</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="business-software">Business Software System</option>
                  <option value="website">Website Development</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="custom">Custom Software Solution</option>
                  <option value="university">University Project</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button type="submit" className="cta-button primary full-width">
                <Send size={20} />
                Send Message
                <div className="button-glow" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

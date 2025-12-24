
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, MapPin, MessageSquare } from 'lucide-react';
import * as emailjs from '@emailjs/browser';

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

  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      'service_5vuwywi',
      'template_y8ew3q8',
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      },
      '-C4Cc_NlAfUiDf5B3'
    ).then(
      () => {
        setNotification({ type: 'success', message: '😊 Thank you for your message! We will get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setIsSending(false);
        setTimeout(() => setNotification(null), 4000);
      },
      (error) => {
        console.error('Email send error:', error);
        setNotification({ type: 'error', message: '😅 Oops! Something went wrong. Please try again later.' });
        setIsSending(false);
        setTimeout(() => setNotification(null), 4000);
      }
    );
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info.neonxdev@gmail.com', href: 'mailto:info.neonxdev@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 74 368 5240 / +94 75 467 1921', href: 'tel:+94 74 368 5240' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+94 74 368 5240 / +94 75 467 1921', href: 'https://wa.me/+94743685240' },
    { icon: MapPin, label: 'Location', value: 'Colombo', href: '#' }
  ];

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="section-container">
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
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                    }}
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

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form className="glass-card contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Service Required</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  <option value="Business Software System">Business Software System</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Custom Software Solution">Custom Software Solution</option>
                  <option value="University Project">University Project</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Details</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} />
              </div>

              <button type="submit" className="cta-button primary full-width" disabled={false}>
                <Send size={20} />
                {false ? "Sending..." : "Send Message"}
                <div className="button-glow" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

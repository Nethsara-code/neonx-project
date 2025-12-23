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
    <section id="contact" ref={ref} style={{ padding: '4rem 2rem', background: '#111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem', color: '#fff' }}
        >
          <span style={{ color: '#0ff', fontWeight: 600 }}>Get In Touch</span>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>Let's Build Something Neon</h2>
          <p style={{ fontSize: '1rem', color: '#ccc' }}>
            Ready to transform your ideas into reality? Contact us today
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 300px' }}
          >
            <div style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
              <h3 style={{ marginBottom: '1rem' }}>Contact Information</h3>
              <p>Reach out to us through any of these channels</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', textDecoration: 'none' }}
                  >
                    <div style={{ position: 'relative' }}>
                      <info.icon size={24} />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600 }}>{info.label}</span><br />
                      <span>{info.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 400px', position: 'relative' }}
          >
            Notification
            {notification && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
                style={{
                  position: 'absolute',
                  top: '-4rem',
                  left: '10%',
                  transform: 'translateX(50%)',
                  background: notification.type === 'success'
                    ? 'linear-gradient(90deg, #0ff, #0ff, #0f0)'
                    : 'linear-gradient(90deg, #f00, #f55, #f0f)',
                  color: '#000',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  // boxShadow: notification.type === 'success'
                  //   ? '0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff'
                  //   : '0 0 20px #f00, 0 0 40px #f55, 0 0 60px #f0f',
                  // pointerEvents: 'none',
                  // textShadow: notification.type === 'success'
                  //   ? '0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff'
                  //   : '0 0 5px #f00, 0 0 10px #f55, 0 0 15px #f0f'
                }}
              >
                {notification.message}
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{
                padding: '2rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {['name', 'email', 'phone'].map((field) => (
                <div key={field} style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: '#0ff' }}>
                    {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required={field !== 'phone'}
                    placeholder={field === 'name' ? 'John Doe' : field === 'email' ? 'john@example.com' : '+1 (555) 123-4567'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #0ff',
                      background: '#111',
                      color: '#fff',
                      outline: 'none',
                      boxShadow: '0 0 10px rgba(0,255,255,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.8)')}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,255,0.4)')}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: '#0ff' }}>
                  Service Required
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #0ff',
                    background: '#111',
                    color: '#fff',
                    outline: 'none',
                    boxShadow: '0 0 10px rgba(0,255,255,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.8)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,255,0.4)')}
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: '#0ff' }}>
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #0ff',
                    background: '#111',
                    color: '#fff',
                    outline: 'none',
                    boxShadow: '0 0 10px rgba(0,255,255,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.8)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,255,0.4)')}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(90deg, #0ff, #0ff 50%, #00f)',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 700,
                  color: '#000',
                  boxShadow: '0 0 20px rgba(0,255,255,0.7)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Send size={24} />
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

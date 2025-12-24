import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  /* ================= Features ================= */
  const features = [
    {
      title: 'Our Mission',
      description:
        'To deliver requirement-based, customer-focused software development solutions that empower businesses and students with modern technology.'
    },
    {
      title: 'Our Vision',
      description:
        'To become the leading software development partner for businesses and educational institutions, driving innovation through cutting-edge solutions.'
    },
    {
      title: 'Our Approach',
      description:
        'We combine futuristic technology with practical solutions, ensuring every project is tailored to meet specific client needs and objectives.'
    }
  ];

  /* ================= Co-Founders ================= */
  const coFounders = [
    {
      id: 1,
      name: 'Hirusha Nethsara',
      position: 'Co-Founder & CEO',
      photo: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
      id: 2,
      name: 'Prasad Nirmal',
      position: 'Co-Founder & CTO',
      photo: 'https://randomuser.me/api/portraits/women/12.jpg'
    }
  ];

  return (
    <section id="about" className="section about-section" ref={ref} style={{ padding: '5rem 4rem', background: '#0d0d0d', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ===== About NEONX Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ color: '#0ff', fontWeight: 600 }}>Who We Are</span>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>About NEONX</h2>
          <p style={{ maxWidth: 800, margin: '0 auto', color: '#aaa' }}>
            We are a next-generation software development company specializing in custom business systems, web and mobile applications,
            and university-level software projects. Our mission is to transform ideas into powerful digital solutions.
          </p>
        </motion.div>

        {/* ===== Features Grid ===== */}
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '4rem' }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: '0 0 15px rgba(0,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: '#aaa' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ===== Co-Founders Section ===== */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.8rem' }}>Our Co-Founders</h3>
          <div
            style={{
              display: 'grid',
              gap: '3rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              justifyItems: 'center'
            }}
          >
            {coFounders.map((co, index) => (
             <motion.div
              key={co.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              style={{
                width: 450,
                padding: '0.1rem 1.5rem 1.5rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {/* Name & Position on Top Right */}
              <div style={{ position: 'absolute', top: 20, right: 10, textAlign: 'right' }}>
                <h4 style={{ margin: 0, color: '#fff' }}>{co.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0ff' }}>{co.position}</p>
              </div>

              {/* Photo */}
              <img
                src={co.photo}
                alt={co.name}
                style={{ width: 120, height: 120, borderRadius: '50%', marginTop: 60, objectFit: 'cover' }}
              />
            </motion.div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import co1 from './assets/co1.jpg';
import co2 from './assets/co2.png';

export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  /* ================= About Us Features ================= */
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
      photo: co1,
      linkedin: 'https://www.linkedin.com/in/hirusha-nethsara-a24612380/'
    },
    {
      id: 2,
      name: 'Prasad Nirmal',
      position: 'Co-Founder & CTO',
      photo: co2,
      linkedin: 'https://www.linkedin.com/in/prasad-nirmal-4603a8196/'
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '5rem 2rem',
        background: '#0d0d0d',
        color: '#fff'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ================= About Us Header ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span style={{ color: '#0ff', fontWeight: 600 }}>Who We Are</span>
          <h2 style={{ fontSize: '2.8rem', margin: '0.5rem 0' }}>About NEONX</h2>
          <p style={{ maxWidth: 850, margin: '0 auto', color: '#aaa' }}>
            We are a next-generation software development company specializing in
            custom business systems, web & mobile applications, and university-level
            software projects. Our mission is to transform ideas into powerful
            digital solutions.
          </p>
        </motion.div>

        {/* ================= Features Grid ================= */}
        <div
          style={{
            display: 'grid',
            gap: '1.8rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            marginBottom: '5rem'
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{
                padding: '1.8rem',
                borderRadius: '1.2rem',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: '0 0 18px rgba(0,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ marginBottom: '0.6rem' }}>{feature.title}</h3>
              <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= Co-Founders ================= */}
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '2.6rem'
          }}
        >
          Our Co-Founders
        </h3>

        <div
          style={{
            display: 'grid',
            gap: '2.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            justifyItems: 'center'
          }}
        >
          {coFounders.map((co, index) => (
            <motion.div
              key={co.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              style={{
                width: '100%',
                maxWidth: 500,
                padding: '2.2rem',
                borderRadius: '1.5rem',
                background:
                  'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(255,255,255,0.05))',
                boxShadow:
                  '0 0 30px rgba(0,255,255,0.35), inset 0 0 18px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Top Row */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <img
                  src={co.photo}
                  alt={co.name}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #0ff'
                  }}
                />

                <div>
                  <h4 style={{ margin: 0, fontSize: '1.7rem' }}>
                    {co.name}
                  </h4>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: '1.05rem',
                      color: '#0ff'
                    }}
                  >
                    {co.position}
                  </p>
                </div>
              </div>

              {/* LinkedIn Center */}
              <div
                style={{
                  marginTop: '1.6rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <a
                  href={co.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={iconStyle}
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 24h4.56V7.98H.22V24zM8.09 7.98H12.5v2.2h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7V24h-4.56v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8.09V7.98z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Icon Style ================= */
const iconStyle: React.CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,255,255,0.15)',
  color: '#0ff',
  boxShadow: '0 0 14px rgba(0,255,255,0.45)',
  textDecoration: 'none'
};

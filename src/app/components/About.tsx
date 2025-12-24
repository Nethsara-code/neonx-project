import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import co1 from './assets/co1.jpg';
import co2 from './assets/co2.png';

export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
        {/* ===== Section Title ===== */}
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '2.8rem'
          }}
        >
          Our Co-Founders
        </h3>

        {/* ===== Cards Grid ===== */}
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
                padding: '2rem',
                borderRadius: '1.4rem',
                background:
                  'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(255,255,255,0.05))',
                boxShadow:
                  '0 0 30px rgba(0,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* ===== Top Content ===== */}
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
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #0ff'
                  }}
                />

                <div>
                  <h4 style={{ margin: 0, fontSize: '1.6rem' }}>
                    {co.name}
                  </h4>
                  <p
                    style={{
                      marginTop: 6,
                      color: '#0ff',
                      fontSize: '1.05rem'
                    }}
                  >
                    {co.position}
                  </p>
                </div>
              </div>

              {/* ===== LinkedIn Only ===== */}
              <div
                style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
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

/* ===== LinkedIn Icon Style ===== */
const iconStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,255,255,0.15)',
  color: '#0ff',
  boxShadow: '0 0 12px rgba(0,255,255,0.4)',
  transition: 'opacity 0.3s ease'
};

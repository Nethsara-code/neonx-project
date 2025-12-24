import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/* ================= Navbar ================= */
export function Navbar() {
  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: '#111',
        display: 'flex',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <a href="#projects" style={{ color: '#0ff', fontWeight: 600 }}>
        Projects
      </a>
      <a href="#contact" style={{ color: '#0ff', fontWeight: 600 }}>
        Contact
      </a>
    </nav>
  );
}

/* ================= Rain Effect ================= */
function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const drops: any[] = [];
    const numDrops = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // for (let i = 0; i < numDrops; i++) {
    //   drops.push({
    //     x: Math.random() * canvas.width,
    //     y: Math.random() * canvas.height,
    //     l: Math.random() * 6 + 4,
    //     xs: Math.random() * 2 - 1,
    //     ys: Math.random() * 3 + 2
    //   });
    // }

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0,255,255,0.5)';
      ctx.lineWidth = 1;

      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.xs, d.y + d.l);
        ctx.stroke();

        d.x += d.xs;
        d.y += d.ys;

        if (d.y > canvas.height) {
          d.y = -20;
          d.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

/* ================= Star Component ================= */
function Star({ size = 16, color = '#ffd700' }: { size?: number; color?: string }) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  );
}

/* ================= Projects + Feedback ================= */
export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: 'Enterprise ERP System',
      description: 'Comprehensive enterprise resource planning system.',
      image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d',
      tags: ['React', 'Node.js']
    },
    {
      title: 'E-Commerce Platform',
      description: 'Online shopping platform with admin dashboard.',
      image: 'https://images.unsplash.com/photo-1762279388952-85187155e48d',
      tags: ['React', 'MongoDB']
    }
  ];

  /* ===== Feedback State ===== */
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<{
    id: number;
    name: string;
    message: string;
    date: string;
  }[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('project-feedbacks');
    if (saved) setFeedbacks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('project-feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const submitFeedback = () => {
    if (!message.trim()) return;
    setFeedbacks([
      {
        id: Date.now(),
        name: name || 'Anonymous',
        message,
        date: new Date().toLocaleString()
      },
      ...feedbacks
    ]);
    setName('');
    setMessage('');
  };

  const deleteFeedback = (id: number) => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: 'relative',
        padding: '5rem 2rem',
        background: '#0d0d0d',
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      <RainEffect />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}
        >
          Featured Projects
        </motion.h2>

        {/* ===== Projects Grid ===== */}
        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 0 25px rgba(0,255,255,0.25)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <ImageWithFallback src={project.image} alt={project.title} />
              <div style={{ padding: '1.5rem' }}>
                <h3>{project.title}</h3>
                <p style={{ color: '#aaa' }}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== Feedback Cards with Title ===== */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            💬 What People Are Saying
          </h3>

          <div
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}
          >
            {[
              {
                id: 1,
                name: 'Alice Johnson',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg',
                message: 'Amazing project, really helped our team streamline processes!',
                date: '2025-12-24 10:30 AM',
                rating: 5
              },
              {
                id: 2,
                name: 'Bob Smith',
                photo: 'https://randomuser.me/api/portraits/men/32.jpg',
                message: 'The UI is very clean and intuitive. Loved it!',
                date: '2025-12-23 03:15 PM',
                rating: 4
              }
            ].map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'relative',
                  padding: '1rem 1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  boxShadow: '0 0 15px rgba(0,255,255,0.2)',
                  backdropFilter: 'blur(6px)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 8 }}>
                  <img src={f.photo} alt={f.name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                  <strong>{f.name}</strong>
                </div>

                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={16} color={i <= f.rating ? '#ffd700' : '#555'} />
                  ))}
                </div>

                <p style={{ marginBottom: 8 }}>{f.message}</p>
                <small style={{ color: '#888' }}>{f.date}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Styles ================= */
const inputStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '1rem',
  padding: '1.75rem',
  borderRadius: '0.6rem',
  border: '1px solid #0ff',
  background: '#111',
  color: '#fff'
};

const btnStyle: React.CSSProperties = {
  width: '100%',
  background: '#0ff',
  color: '#000',
  border: 'none',
  padding: '0.75rem',
  borderRadius: '0.6rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const cardStyle: React.CSSProperties = {
  maxWidth: 600,
  margin: '4rem auto 0',
  padding: '2rem',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '1rem',
  boxShadow: '0 0 30px rgba(0,255,255,0.3)',
  backdropFilter: 'blur(8px)'
};

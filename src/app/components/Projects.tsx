import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Code2, MessageSquare, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Rain Effect Component
function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const drops: { x: number; y: number; l: number; xs: number; ys: number }[] = [];
    const numDrops = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < numDrops; i++) {
      drops[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 2 + 4,
        xs: Math.random() * 2 - 1,
        ys: Math.random() * 2 + 1,
      };
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.3)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0,255,255,0.5)'; // neon cyan
      ctx.lineWidth = 1;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.xs, d.y + d.l);
        ctx.stroke();

        d.x += d.xs;
        d.y += d.ys;

        if (d.y > canvas.height) {
          d.x = Math.random() * canvas.width;
          d.y = -20;
        }
      }

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
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

// Projects Component
export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [showFeedback, setShowFeedback] = useState<number | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const projects = [
    {
      title: 'Enterprise ERP System',
      category: 'Business Software',
      description: 'Comprehensive enterprise resource planning system.',
      image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d',
      tags: ['React', 'Node.js']
    },
    {
      title: 'E-Commerce Platform',
      category: 'Web Application',
      description: 'Online shopping platform with admin dashboard.',
      image: 'https://images.unsplash.com/photo-1762279388952-85187155e48d',
      tags: ['React', 'MongoDB']
    }
  ];

  /* Load feedbacks */
  useEffect(() => {
    const saved = localStorage.getItem('project-feedbacks');
    if (saved) setFeedbacks(JSON.parse(saved));
  }, []);

  /* Save feedbacks */
  useEffect(() => {
    localStorage.setItem('project-feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const submitFeedback = (projectTitle: string) => {
    if (!name || !message) return;

    setFeedbacks([
      ...feedbacks,
      {
        project: projectTitle,
        name,
        message,
        date: new Date().toLocaleString()
      }
    ]);

    setName('');
    setMessage('');
  };

  const deleteFeedback = (index: number) => {
    const updated = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(updated);
  };

  return (
    <section ref={ref} style={{ position: 'relative', padding: '4rem 2rem', overflow: 'hidden', background: '#111', color: '#fff' }}>
      <RainEffect /> {/* Background Rain */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          Featured Projects
        </motion.h2>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
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
                boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                backdropFilter: 'blur(5px)',
              }}
            >
              <ImageWithFallback src={project.image} alt={project.title} />

              <div style={{ padding: '1.5rem' }}>
                <h3>{project.title}</h3>
                <p style={{ color: '#aaa' }}>{project.description}</p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.8rem', color: '#0ff' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setShowFeedback(showFeedback === index ? null : index)}
                  style={{
                    marginTop: '1rem',
                    background: '#0ff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <MessageSquare size={16} /> Feedback
                </button>

                {showFeedback === index && (
                  <div style={{ marginTop: '1rem' }}>
                    <input
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #0ff', background: '#111', color: '#fff' }}
                    />
                    <textarea
                      placeholder="Your Comment"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #0ff', background: '#111', color: '#fff' }}
                    />
                    <button
                      onClick={() => submitFeedback(project.title)}
                      style={{
                        background: '#0ff',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}

                {feedbacks
                  .filter(f => f.project === project.title)
                  .map((f, i) => (
                    <div
                      key={i}
                      style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderLeft: '3px solid #0ff',
                        borderRadius: '0.5rem',
                        position: 'relative'
                      }}
                    >
                      <strong>{f.name}</strong>
                      <p>{f.message}</p>
                      <small style={{ color: '#888' }}>{f.date}</small>

                      <button
                        onClick={() => deleteFeedback(i)}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: 'none',
                          border: 'none',
                          color: '#f55',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

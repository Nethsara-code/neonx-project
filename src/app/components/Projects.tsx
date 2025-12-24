import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { auth, provider, db } from './firebase';
import { signInWithPopup, User } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, DocumentData, QuerySnapshot } from 'firebase/firestore';

/* ================= Navbar ================= */
export function Navbar() {
  return (
    <nav style={{ padding: '1rem 2rem', background: '#111', display: 'flex', gap: '1rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <a href="#projects" style={{ color: '#0ff', fontWeight: 600 }}>Projects</a>
      <a href="#contact" style={{ color: '#0ff', fontWeight: 600 }}>Contact</a>
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

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 6 + 4,
        xs: Math.random() * 2 - 1,
        ys: Math.random() * 3 + 2
      });
    }

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

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

/* ================= Projects + Feedback ================= */
interface Feedback {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
  message: string;
  createdAt: string;
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    { title: 'Enterprise ERP System', description: 'Comprehensive enterprise resource planning system.', image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d' },
    { title: 'E-Commerce Platform', description: 'Online shopping platform with admin dashboard.', image: 'https://images.unsplash.com/photo-1762279388952-85187155e48d' }
  ];

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showAll, setShowAll] = useState(false);

  /* ===== Google Login ===== */
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== Firestore Realtime Listener ===== */
  useEffect(() => {
    const q = query(collection(db, 'projectFeedbacks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Feedback[];
      setFeedbacks(data);
    });
    return () => unsub();
  }, []);

  const submitFeedback = async () => {
    if (!message.trim() || !user) return;

    await addDoc(collection(db, 'projectFeedbacks'), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      message,
      createdAt: new Date().toISOString()
    });

    setMessage('');
  };

  const deleteFeedback = async (id: string) => {
    await deleteDoc(doc(db, 'projectFeedbacks', id));
  };

  return (
    <section id="projects" ref={ref} style={{ position: 'relative', padding: '5rem 2rem', background: '#0d0d0d', color: '#fff', overflow: 'hidden' }}>
      <RainEffect />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
          Featured Projects
        </motion.h2>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {projects.map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.2 }} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 0 25px rgba(0,255,255,0.25)', backdropFilter: 'blur(6px)' }}>
              <ImageWithFallback src={project.image} alt={project.title} />
              <div style={{ padding: '1.5rem' }}>
                <h3>{project.title}</h3>
                <p style={{ color: '#aaa' }}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== Feedback Form ===== */}
        <div style={cardStyle}>
          {!user ? (
            <button onClick={loginWithGoogle} style={btnStyle}>Sign in with Google</button>
          ) : (
            <>
              <p>Logged in as {user.displayName}</p>
              <textarea placeholder="Your feedback..." value={message} onChange={e => setMessage(e.target.value)} rows={4} style={inputStyle} />
              <button onClick={submitFeedback} style={btnStyle}><Send size={16} /> Send Feedback</button>
            </>
          )}
        </div>

        {/* ===== Feedback List ===== */}
        <div style={{ marginTop: '3rem', display: 'grid', gap: '1rem' }}>
          {(showAll ? feedbacks : feedbacks.slice(0, 3)).map(f => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={feedbackBox}>
              {f.photoURL && <img src={f.photoURL} alt={f.name} style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />}
              <strong>{f.name}</strong>
              <p>{f.message}</p>
              <small>{new Date(f.createdAt).toLocaleString()}</small>
              <button onClick={() => deleteFeedback(f.id)} style={deleteBtn}><Trash2 size={14} /></button>
            </motion.div>
          ))}
          {feedbacks.length > 3 && <button onClick={() => setShowAll(!showAll)} style={seeMoreBtn}>{showAll ? 'Show Less' : `See More (${feedbacks.length - 3})`}</button>}
        </div>
      </div>
    </section>
  );
}

/* ================= Styles ================= */
const inputStyle: React.CSSProperties = { width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.6rem', border: '1px solid #0ff', background: '#111', color: '#fff' };
const btnStyle: React.CSSProperties = { width: '100%', background: '#0ff', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '0.6rem', fontWeight: 600, cursor: 'pointer' };
const cardStyle: React.CSSProperties = { maxWidth: 600, margin: '4rem auto 0', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', boxShadow: '0 0 30px rgba(0,255,255,0.3)', backdropFilter: 'blur(8px)' };
const feedbackBox: React.CSSProperties = { position: 'relative', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.06)', borderLeft: '3px solid #0ff', display: 'flex', alignItems: 'center', gap: '0.5rem' };
const deleteBtn: React.CSSProperties = { marginLeft: 'auto', background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' };
const seeMoreBtn: React.CSSProperties = { marginTop: '1rem', background: 'none', border: '1px solid #0ff', color: '#0ff', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', justifySelf: 'center', width: 'fit-content', alignSelf: 'center' };

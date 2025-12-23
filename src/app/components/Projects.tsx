import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: 'Enterprise ERP System',
      category: 'Business Software',
      description: 'Comprehensive enterprise resource planning system for manufacturing companies.',
      image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNvZnR3YXJlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2NjM4NzI2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'E-Commerce Platform',
      category: 'Web Application',
      description: 'Full-featured online shopping platform with payment integration and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1762279388952-85187155e48d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc2NjM3MjQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Express', 'MongoDB']
    },
    {
      title: 'Fitness Tracking App',
      category: 'Mobile Application',
      description: 'Cross-platform mobile app for workout tracking and health monitoring.',
      image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjY0MTYxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Flutter', 'Firebase', 'Dart']
    }
  ];

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Showcasing our expertise in building powerful digital solutions
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card rounded-[15px]"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="project-image">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                />
                <div className="project-overlay">
                  <button className="icon-button">
                    <ExternalLink size={20} />
                  </button>
                  <button className="icon-button">
                    <Code2 size={20} />
                  </button>
                </div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

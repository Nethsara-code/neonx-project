import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, FileText, Presentation, Code, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UniversityProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const universityProjects = [
    {
      title: 'Smart Attendance System',
      description: 'Face recognition-based attendance tracking system with real-time reporting.',
      technologies: ['Python', 'OpenCV', 'Flask', 'MySQL'],
      features: ['Face Detection', 'Real-time Tracking', 'Admin Dashboard', 'Reports']
    },
    {
      title: 'Online Learning Platform',
      description: 'E-learning platform with video streaming, quizzes, and progress tracking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
      features: ['Video Lectures', 'Interactive Quizzes', 'Progress Tracking', 'Certificates']
    },
    {
      title: 'Inventory Management System',
      description: 'Comprehensive inventory tracking system with analytics and reporting.',
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
      features: ['Stock Management', 'Analytics', 'Alerts', 'Multi-user']
    }
  ];

  const support = [
    { icon: FileText, text: 'Complete Documentation' },
    { icon: Presentation, text: 'Project Reports' },
    { icon: Code, text: 'Code Explanation' },
    { icon: CheckCircle, text: 'Presentation Support' }
  ];

  return (
    <section id="university" className="section university-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Academic Excellence</span>
          <h2 className="section-title">University Projects</h2>
          <p className="section-description">
            Final-year and academic software projects with comprehensive support
          </p>
        </motion.div>

        <motion.div
          className="university-hero glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="university-hero-content">
            <GraduationCap size={64} className="uni-icon" />
            <h3>Complete Academic Support</h3>
            <p>
              We provide end-to-end support for university software projects, including full 
              documentation, detailed reports, presentation materials, and comprehensive code explanations.
            </p>
            <div className="support-features">
              {support.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="support-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <item.icon size={20} />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="university-hero-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjY0NjI0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="University Projects"
            />
          </div>
        </motion.div>

        <div className="university-projects-grid">
          {universityProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass-card university-project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="tech-stack">
                <h4>Technologies:</h4>
                <div className="tech-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-features">
                <h4>Features:</h4>
                <ul>
                  {project.features.map(feature => (
                    <li key={feature}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

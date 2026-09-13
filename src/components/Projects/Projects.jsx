import { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import LiquidGlassCard from '../LiquidGlass/LiquidGlassCard';
import ProjectModal from './ProjectModal';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Projects.module.css';

const CATEGORIES = [
  { id: 'all', label: 'ALL WORKS [3]' },
  { id: '3d', label: '3D & GRAPHICS' },
  { id: 'compiler', label: 'COMPILERS & RUST' },
  { id: 'multiplayer', label: 'MULTIPLAYER & CRDT' }
];

export default function Projects({ onShowToast }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useScrollReveal();

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={sectionRef} className={styles.projectsSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={`${styles.sectionTag} reveal-on-scroll`}>
            [ 01 // SELECTED WORK &amp; CASE STUDIES ]
          </div>
          <h2 className={`${styles.sectionTitle} reveal-on-scroll stagger-1`}>
            Featured Software &amp; <span className={styles.gradientTitle}>Open-Source Systems</span>
          </h2>
          <p className={`${styles.sectionSub} reveal-on-scroll stagger-2`}>
            Real-world applications, developer toolchains, and 3D graphics engines
            built from scratch with an obsession for performance and UX. Click any project to inspect deep architectural specs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className={`${styles.filterBar} reveal-on-scroll stagger-2`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Selected Works Grid */}
        <div className={`${styles.projectsGrid} reveal-on-scroll stagger-3`}>
          {filteredProjects.map((project, i) => (
            <div
              key={project.id || i}
              className={styles.projectCardWrapper}
              onClick={() => setSelectedProject(project)}
            >
              <LiquidGlassCard className={styles.projectCard}>
                {/* Card Meta Header */}
                <div className={styles.cardMetaBar}>
                  <div className={styles.indexWrap}>
                    <span className={styles.cardIndex}>{project.index}</span>
                    <span className={styles.cardDomain}>{project.domain}</span>
                  </div>
                  <span className={styles.cardBadge}>{project.badge}</span>
                </div>

                {/* Rich Visual Mockup Viewport */}
                <div className={styles.imageViewport}>
                  <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    className={styles.projectImg}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay} />
                  {project.stats && (
                    <div className={styles.viewportStats}>{project.stats}</div>
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  {/* Tech Chips */}
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, tIndex) => (
                      <span key={tIndex} className={styles.projectTag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links & Modal Trigger */}
                  <div className={styles.projectLinks}>
                    <button
                      type="button"
                      className={styles.inspectPrompt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      Inspect Architecture [↗]
                    </button>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.linkGithub}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Source [↗]
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.linkDemo}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live [↗]
                      </a>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Architectural Drawer Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onShowToast={onShowToast}
        />
      )}
    </section>
  );
}

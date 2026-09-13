import { useState, useEffect } from 'react';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.architecture?.codeSnippet) {
      navigator.clipboard.writeText(project.architecture.codeSnippet);
      setCopied(true);
      if (onShowToast) {
        onShowToast(`COPIED // ${project.title} SNIPPET`);
      }
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalDrawer} onClick={(e) => e.stopPropagation()}>
        {/* Modal Sticky Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerMeta}>
            <span className={styles.indexTag}>[{project.index}]</span>
            <span className={styles.domainTag}>{project.domain}</span>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close project modal"
          >
            [ ESC // CLOSE ]
          </button>
        </div>

        {/* Modal Content */}
        <div className={styles.modalBody}>
          {/* Title Area */}
          <div className={styles.titleArea}>
            <h2 className={styles.modalTitle}>{project.title}</h2>
            <p className={styles.modalDesc}>{project.description}</p>
          </div>

          {/* Action Links */}
          <div className={styles.actionLinks}>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.liveBtn}
            >
              Launch Live Application [↗]
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.codeBtn}
            >
              Inspect Source Repository [↗]
            </a>
          </div>

          {/* Screenshot Banner */}
          <div className={styles.previewBanner}>
            <img
              src={project.image}
              alt={`${project.title} architecture screenshot`}
              className={styles.bannerImg}
            />
          </div>

          {/* Benchmarks Matrix */}
          {project.architecture?.benchmarks && (
            <div className={styles.sectionBlock}>
              <div className={styles.sectionLabel}>VERIFIED SYSTEM BENCHMARKS</div>
              <div className={styles.benchmarkGrid}>
                {project.architecture.benchmarks.map((bench, idx) => (
                  <div key={idx} className={styles.benchmarkCard}>
                    <span className={styles.benchmarkLabel}>{bench.label}</span>
                    <span className={styles.benchmarkVal}>{bench.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Pipeline */}
          {project.architecture?.pipeline && (
            <div className={styles.sectionBlock}>
              <div className={styles.sectionLabel}>SYSTEM PIPELINE ARCHITECTURE</div>
              <div className={styles.pipelineBox}>
                {project.architecture.pipeline}
              </div>
            </div>
          )}

          {/* Engineering Highlights */}
          {project.architecture?.highlights && (
            <div className={styles.sectionBlock}>
              <div className={styles.sectionLabel}>CORE ENGINEERING BREAKTHROUGHS</div>
              <ul className={styles.highlightsList}>
                {project.architecture.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.highlightBullet}>[+]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Code Inspector */}
          {project.architecture?.codeSnippet && (
            <div className={styles.sectionBlock}>
              <div className={styles.sectionLabel}>SOURCE CODE KERNEL</div>
              <div className={styles.codeInspector}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeFileName}>
                    {project.id === 'hypergraph' ? 'dispersion.glsl' : project.id === 'neuralmesh' ? 'simplifier.rs' : 'syncMesh.ts'}
                  </span>
                  <button
                    type="button"
                    className={styles.copyCodeBtn}
                    onClick={handleCopyCode}
                  >
                    {copied ? '✓ COPIED' : '[ COPY SNIPPET ]'}
                  </button>
                </div>
                <pre className={styles.codePre}>
                  <code>{project.architecture.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

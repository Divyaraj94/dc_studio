import { useState, useEffect, useRef } from 'react';
import styles from './MatrixLoader.module.css';

const BOOT_LOGS = [
  'INITIALIZING QUANTUM_SYS_KERNEL v4.2.0...',
  'CONNECTING TO NEURAL DATA NODE [IP: 192.168.0.42]...',
  'DECRYPTING PORTFOLIO_CORE_MODULES... [OK]',
  'STARTING THREE.JS CYBER GRAPHICS PIPELINE... [OK]',
  'INJECTING WEBGL LIQUID SIMPLEX SHADERS... [OK]',
  'CONFIGURING CHROMATIC LIQUID GLASS REFRACTIONS... [OK]',
  'SYSTEM INTEGRITY: 100% SECURE. READY FOR ACCESS.'
];

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>{}[]/*+=~$_#';

export default function MatrixLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [readyToEnter, setReadyToEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const logsScrollRef = useRef(null);

  // 1. Matrix Rain Canvas Effect with Cursor Interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(10, 15, 12, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Space Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interaction: Distance to mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.fillStyle = '#67e8f9'; // Cyan interactive ripple
        } else if (drops[i] % 4 === 0) {
          ctx.fillStyle = '#ffffff'; // Leading bright white glyph
        } else {
          ctx.fillStyle = '#00ff66'; // Classic matrix green
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Boot logs streaming & progress bar
  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setReadyToEnter(true);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 120);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Auto-scroll ONLY the logs list, keeping DC SYSTEM banner permanently in view
  useEffect(() => {
    if (logsScrollRef.current) {
      logsScrollRef.current.scrollTop = logsScrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle Finish / Exit Transition
  const triggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  // Keyboard navigation / input handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        triggerEnter();
      } else if (e.key === 'Enter') {
        triggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExiting]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = userInput.trim().toLowerCase();
    if (cmd === 'clear') {
      setLogs([]);
    } else if (cmd === 'help') {
      setLogs((prev) => [
        ...prev,
        '> Available commands: enter, skip, help, clear, whoami, matrix'
      ]);
    } else if (cmd === 'whoami') {
      setLogs((prev) => [...prev, '> GUEST_AUTHENTICATED: DC_PORTFOLIO_VISITOR']);
    } else if (cmd === 'enter' || cmd === 'skip') {
      triggerEnter();
    } else {
      triggerEnter();
    }
    setUserInput('');
  };

  const progressChars = Math.floor((Math.min(progress, 100) / 100) * 25);
  const progressBarString = '█'.repeat(progressChars) + '░'.repeat(25 - progressChars);

  return (
    <div className={`${styles.loaderOverlay} ${isExiting ? styles.exiting : ''}`}>
      {/* Background Matrix Rain */}
      <canvas ref={canvasRef} className={styles.matrixCanvas} />

      {/* CRT scanline scan overlay */}
      <div className={styles.scanlineOverlay} aria-hidden="true" />

      {/* Terminal Container */}
      <div className={styles.terminalContainer}>
        {/* Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className={styles.headerDots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.headerTitle}>
            root@dc-terminal:~ [NODE_0x7F4] — BASH
          </div>
          <button
            onClick={triggerEnter}
            className={styles.skipBtn}
            title="Press ESC to skip"
          >
            SKIP [ESC]
          </button>
        </div>

        {/* Terminal Body */}
        <div className={styles.terminalBody}>
          {/* Pinned Top Banner: DC SYSTEM ASCII art & System Meta */}
          <div className={styles.bannerSection}>
            <pre className={styles.asciiBanner}>
{`  ██████╗   ██████╗      ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
  ██╔══██╗ ██╔════╝      ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
  ██║  ██║ ██║     █████╗███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
  ██║  ██║ ██║     ╚════╝╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
  ██████╔╝ ╚██████╗      ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
  ╚═════╝   ╚═════╝      ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝`}
            </pre>
            <div className={styles.mobileBanner}>
              [ DC SYSTEM // NEURAL_OS v4.2 ]
            </div>

            <div className={styles.sysInfo}>
              <div>SYSTEM: DC_OS_ONLINE // KERNEL: 6.8.2 // SECURITY: ENCRYPTED</div>
              <div>STATUS: {progress < 100 ? 'COMPILING ASSETS...' : 'SYSTEM READY'}</div>
            </div>
          </div>

          {/* Scrollable Boot logs output */}
          <div ref={logsScrollRef} className={styles.logsScrollArea}>
            <div className={styles.logsList}>
              {logs.map((log, index) => (
                <div key={index} className={styles.logLine}>
                  <span className={styles.logPrompt}>&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>BOOT PROGRESS:</div>
            <div className={styles.progressBarText}>
              [{progressBarString}] {Math.min(progress, 100)}%
            </div>
          </div>

          {/* Command Prompt Form */}
          <form onSubmit={handleCommandSubmit} className={styles.promptRow}>
            <span className={styles.userPrompt}>guest@dc-matrix:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={readyToEnter ? 'Press ENTER to access portfolio...' : 'Decrypting...'}
              className={styles.terminalInput}
              autoFocus
            />
          </form>
        </div>

        {/* Enter CTA Footer */}
        <div className={styles.terminalFooter}>
          <div className={styles.footerHint}>
            Interactive: Move mouse to scatter rain • Type commands or press Enter
          </div>
          <button
            onClick={triggerEnter}
            className={styles.enterBtn}
          >
            ENTER THE MATRIX
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot as BotIcon, X, Send, ChevronRight, MessageSquareText, Sparkles } from 'lucide-react';
import styles from './Bot.module.css';

export default function Bot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatFeedRef = useRef(null);

  // Auto-scroll chat feed to bottom when messages or typing changes
  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting sequence
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: '1',
            type: 'bot',
            text: "Hi there! I'm the DC Studio Assistant.",
          },
          {
            id: '2',
            type: 'bot',
            text: "Ask me anything about Divya's skills, projects, experience, or type where you'd like to go!",
          }
        ]);
        setIsTyping(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const generateBotResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Navigation & Section queries
    if (q.includes('project') || q.includes('work') || q.includes('3d') || q.includes('built') || q.includes('portfolio')) {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return "Taking you to 01 / Selected Works! Divya has built high-performance 3D graphics applications, developer CLI tools, and full-stack platforms.";
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('talk') || q.includes('message')) {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return "Scrolling to 05 / Initiate Collaboration! You can also reach Divya directly at divyarajsinhc92@gmail.com.";
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework')) {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return "Divya specializes in React, Three.js, TypeScript, Node.js, Python, modern CSS/WebGL shaders, and cloud infrastructure. Check out the Capabilities Matrix!";
    }

    if (q.includes('experience') || q.includes('career') || q.includes('history') || q.includes('background') || q.includes('job') || q.includes('resume') || q.includes('cv')) {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return "Divya is an Independent OSS Builder & Full-Stack Engineer with a track record of building platforms with sub-second response times and scalable architectures.";
    }

    if (q.includes('about') || q.includes('who are you') || q.includes('who is divya') || q.includes('dc') || q.includes('bio')) {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return "Divya (DC) is a Software Engineer & Open Source Builder dedicated to crafting digital experiences with fluid 3D graphics, clean APIs, and thoughtful product design.";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('sup') || q.includes('yo') || q.includes('namaste')) {
      return "Hello! Great to have you here. What would you like to explore today? You can ask about projects, tech stack, experience, or collaborate on something new.";
    }

    if (q.includes('github') || q.includes('open source') || q.includes('oss') || q.includes('code')) {
      return "Divya is passionate about open source! You can check out the repositories at github.com/Divyaraj94.";
    }

    if (q.includes('thank') || q.includes('awesome') || q.includes('cool') || q.includes('great') || q.includes('good')) {
      return "You're very welcome! Feel free to explore the interactive 3D elements or reach out if you'd like to collaborate.";
    }

    // Default intelligent fallback
    return `Divya specializes in high-end web applications and 3D interfaces. You can ask about "skills", "projects", "experience", or "contact" to jump straight to any section!`;
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || isTyping) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Bot response with natural latency
    setTimeout(() => {
      const reply = generateBotResponse(text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  const handleAction = (action) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: action.label }]);
    setIsTyping(true);

    setTimeout(() => {
      if (action.scrollTo) {
        const element = document.getElementById(action.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      let botReply = "Navigating you there right now!";
      if (action.id === 'projects') botReply = "Taking you to 01 / Selected Works! Check out the 3D graphics and full-stack builds.";
      if (action.id === 'experience') botReply = "Here is Divya's career trajectory and track record.";
      if (action.id === 'contact') botReply = "Let's connect! You can use the form below or email directly at divyarajsinhc92@gmail.com.";

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 500);
  };

  const quickActions = [
    { id: 'projects', label: 'See 3D Works', scrollTo: 'projects' },
    { id: 'experience', label: 'View Experience', scrollTo: 'experience' },
    { id: 'contact', label: "Let's Talk", scrollTo: 'contact' },
  ];

  return (
    <div className={styles.botContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatPanel}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.avatar}>
                  <BotIcon size={20} />
                </div>
                <div>
                  <h3 className={styles.botName}>DC Concierge</h3>
                  <span className={styles.status}>
                    <Sparkles size={11} style={{ marginRight: '2px' }} /> Interactive AI
                  </span>
                </div>
              </div>
              <button 
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Feed */}
            <div className={styles.chatFeed} ref={chatFeedRef}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.message} ${styles[msg.type]}`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={styles.typingIndicator}
                >
                  <span />
                  <span />
                  <span />
                </motion.div>
              )}
            </div>

            {/* Quick Actions (only show if few messages) */}
            {messages.length <= 4 && !isTyping && (
              <motion.div 
                className={styles.quickActions}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    className={styles.actionChip}
                    onClick={() => handleAction(action)}
                  >
                    <span>{action.label}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Interactive Input Area */}
            <form className={styles.inputArea} onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask anything or jump to a section..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={styles.input}
                autoFocus
              />
              <button 
                type="submit"
                className={`${styles.sendBtn} ${inputText.trim() ? styles.sendBtnActive : ''}`} 
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        className={`${styles.triggerBtn} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open Assistant"
      >
        <MessageSquareText size={24} className={styles.triggerIcon} />
        <div className={styles.glowEffect} />
      </motion.button>
    </div>
  );
}

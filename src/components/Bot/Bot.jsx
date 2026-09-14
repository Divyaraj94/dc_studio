import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot as BotIcon, X, Send, ChevronRight, MessageSquareText } from 'lucide-react';
import styles from './Bot.module.css';

export default function Bot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initial greeting sequence
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            type: 'bot',
            text: "Hi there! I'm the DC Studio Assistant.",
          },
          {
            id: '2',
            type: 'bot',
            text: "I can help you navigate the portfolio. What would you like to explore?",
          }
        ]);
        setIsTyping(false);
      }, 1200);
    }
  }, [isOpen, messages.length]);

  const handleAction = (action) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: action.label }]);
    
    // Process action
    setTimeout(() => {
      // Scroll if it's a scroll action
      if (action.scrollTo) {
        const element = document.getElementById(action.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
      
      // If it's the contact action, try to find the modal toggle or scroll to contact section
      if (action.actionId === 'contact') {
         const element = document.getElementById('contact');
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
           setIsOpen(false);
         }
      }
    }, 500);
  };

  const quickActions = [
    { id: 'projects', label: 'See 3D Works', scrollTo: 'projects' },
    { id: 'experience', label: 'View Experience', scrollTo: 'experience' },
    { id: 'contact', label: 'Let\'s Talk', actionId: 'contact' },
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
                  <h3 className={styles.botName}>DC Assistant</h3>
                  <span className={styles.status}>Online</span>
                </div>
              </div>
              <button 
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Feed */}
            <div className={styles.chatFeed}>
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

            {/* Quick Actions (only show if bot has sent initial greeting) */}
            {messages.length >= 2 && !isTyping && (
              <motion.div 
                className={styles.quickActions}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    className={styles.actionChip}
                    onClick={() => handleAction(action)}
                  >
                    {action.label}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input area (Visual only for now) */}
            <div className={styles.inputArea}>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                disabled
                className={styles.input}
              />
              <button className={styles.sendBtn} disabled>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        className={`${styles.triggerBtn} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Assistant"
      >
        <MessageSquareText size={24} className={styles.triggerIcon} />
        <div className={styles.glowEffect} />
      </motion.button>
    </div>
  );
}

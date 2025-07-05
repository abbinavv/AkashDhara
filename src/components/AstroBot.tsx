import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, MessageCircle, Zap, Star, Rocket, Moon } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/openaiApi';

interface AstroBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AstroBot: React.FC<AstroBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm AstroBot, your space exploration guide! 🚀 I'm here to answer any questions about space missions, astronomy, famous astronauts like Kalpana Chawla, ISRO achievements, cosmic phenomena, or anything else related to space exploration. What would you like to know about the universe?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await sendChatMessage([...messages, userMessage]);
      
      // Simulate typing delay
      setTimeout(() => {
        const botMessage: ChatMessage = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm having trouble processing your request right now. Please try again! 🛰️",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  const suggestedQuestions = [
    "Tell me about Chandrayaan missions",
    "Who was Kalpana Chawla?",
    "What is ISRO's Mars mission?",
    "Explain black holes",
    "Recent space discoveries",
    "How do rockets work?",
    "What is the International Space Station?",
    "Tell me about the James Webb Space Telescope"
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 w-96 h-[32rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"
              />
            </motion.div>
            <div>
              <h3 className="text-white font-bold text-lg">AstroBot</h3>
              <p className="text-xs text-purple-200 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Your Space Guide
              </p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs rounded-2xl p-4 shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 text-gray-200 border border-white/20 backdrop-blur-sm'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 text-gray-200 rounded-2xl p-4 border border-white/20 backdrop-blur-sm shadow-lg">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 text-purple-400" />
                  </motion.div>
                  <span className="text-sm">AstroBot is thinking...</span>
                  <motion.div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 h-1 bg-purple-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions - Show only when there's only the initial message */}
        {messages.length === 1 && (
          <motion.div 
            className="p-4 border-t border-white/20 bg-gradient-to-r from-white/5 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-gray-400 mb-3 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              Quick start questions:
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-2 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30 shadow-lg text-left"
                >
                  {question}
                </motion.button>
              ))}
            </div>
            <motion.p 
              className="text-xs text-gray-500 mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Or ask me anything about space! 🌌
            </motion.p>
          </motion.div>
        )}

        {/* Input - Always available */}
        <div className="p-4 border-t border-white/20 bg-gradient-to-r from-white/5 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about space exploration..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                disabled={isLoading}
              />
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                animate={{ opacity: inputValue.trim() ? 1 : 0.5 }}
              >
                <MessageCircle className="h-4 w-4 text-gray-400" />
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-5 w-5" />
                </motion.div>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </motion.button>
          </div>
          
          {/* Helpful hint for new users */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-3 text-center"
            >
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Rocket className="h-3 w-3 mr-1" />
                I can answer questions about space missions, astronomy, physics, and more!
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AstroBot;
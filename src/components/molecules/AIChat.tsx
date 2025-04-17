import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import { sendMessage, fetchAIResponse, selectHistory, selectLoading } from '../../store/slices/aiSlice';
// import BlinkingCursor from '../atoms/BlinkingCursor';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const loading = useAppSelector(selectLoading);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Dispatch del mensaje del usuario
    dispatch(sendMessage(input));
    
    // Simular respuesta de la IA
    dispatch(fetchAIResponse(input));
    
    // Limpiar campo de input
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-0 top-0 h-full w-80 bg-[#0D0D0D] border-l-2 border-[#FF4F00] shadow-xl z-50 flex flex-col"
        >
          {/* Header del chat */}
          <div className="flex items-center justify-between p-4 border-b border-[#FF4F00]">
            <h2 className="font-['Orbitron'] text-[#FF4F00] text-lg font-bold">RockuGPT</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-[#FF4F00] transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          
          {/* Historial de mensajes */}
          <div 
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#FF4F00] scrollbar-track-[#0D0D0D]"
          >
            {history.length === 0 ? (
              <div className="text-gray-500 text-center mt-10">
                <p className="mb-2">Inicia una conversación con RockuGPT</p>
                <p>Tu asistente virtual de portafolio</p>
              </div>
            ) : (
              history.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-[#FF4F00] text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))
            )}
          </div>
          
          {/* Formulario de entrada */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#FF4F00]">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder={loading ? "RockuGPT está escribiendo..." : "Escribe tu mensaje..."}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4F00] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`px-4 py-2 bg-[#FF4F00] text-white rounded-r-lg ${
                  loading || !input.trim() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-orange-600 transition-colors'
                }`}
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>➤</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChat;
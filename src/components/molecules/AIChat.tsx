import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import { sendMessage, fetchAIResponse, triggerWhatsAppContact, selectHistory, selectLoading } from '../../store/slices/aiSlice';

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
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);
  
  // Enfocar el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Dar tiempo para que la animación de apertura termine
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    // Dispatch del mensaje del usuario
    dispatch(sendMessage(input));
    
    // Obtener respuesta de Gemini AI
    dispatch(fetchAIResponse(input));
    
    // Limpiar campo de input
    setInput('');
  };

  const handleWhatsAppContact = (customMessage?: string) => {
    if (customMessage) {
      dispatch(triggerWhatsAppContact(customMessage));
      return;
    }

    // Construir resumen inteligente de la conversación
    const userMessages = history
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.content);
    
    // Detectar tipo de solicitud
    const conversation = userMessages.join(' ').toLowerCase();
    let projectType = 'consulta general';
    let details = '';

    if (conversation.includes('contratar') || conversation.includes('servicios')) {
      projectType = 'contratación de servicios';
    } else if (conversation.includes('colaborar') || conversation.includes('colaboración')) {
      projectType = 'propuesta de colaboración';
    } else if (conversation.includes('proyecto')) {
      projectType = 'nuevo proyecto';
    } else if (conversation.includes('consulta')) {
      projectType = 'consultoría técnica';
    }

    // Extraer detalles específicos mencionados
    const keywords = {
      'código abierto': conversation.includes('codigo') && conversation.includes('abierto'),
      'aplicación web': conversation.includes('aplicacion') || conversation.includes('web'),
      'desarrollo': conversation.includes('desarrollo'),
      'colaboración intensa': conversation.includes('intensa'),
      'empresa': conversation.includes('empresa')
    };

    const mentionedDetails = Object.entries(keywords)
      .filter(([_, mentioned]) => mentioned)
      .map(([detail, _]) => detail);

    if (mentionedDetails.length > 0) {
      details = ` Específicamente mencionó: ${mentionedDetails.join(', ')}.`;
    }

    const contextualMessage = `Hola Steven Levoyer! 👋

Me puse en contacto contigo a través de tu portafolio. Estoy interesado en una ${projectType}.${details}

${userMessages.length > 0 ? `\n📝 Resumen de nuestra conversación:\n${userMessages.map((msg, i) => `${i + 1}. ${msg}`).join('\n')}\n` : ''}

¿Podríamos coordinar una conversación para discutir los detalles?

Saludos! 🚀`;
    
    dispatch(triggerWhatsAppContact(contextualMessage));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-0 top-0 h-full w-80 md:w-96 bg-[#0D0D0D] border-l-2 border-[#FF4F00] shadow-xl z-50 flex flex-col"
        >
          {/* Header del chat */}
          <div className="flex items-center justify-between p-4 border-b border-[#FF4F00]">
            <h2 className="font-['Orbitron'] text-[#FF4F00] text-lg font-bold">RockuGPT</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-[#FF4F00] transition-colors"
              aria-label="Cerrar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Historial de mensajes */}
          <div 
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#FF4F00] scrollbar-track-[#0D0D0D]"
          >
            {history.length === 0 ? (
              <div className="text-gray-500 text-center mt-10">
                <p className="mb-2">¡Hola! Soy RockuGPT 🤖</p>
                <p className="mb-2">Tu asistente virtual de portafolio</p>
                <p className="text-sm">Pregúntame sobre proyectos, habilidades</p>
                <p className="text-sm">o si quieres contactar directamente</p>
                <p className="text-sm text-green-400 mt-2">💬 ¡Puedo ayudarte a contactar por WhatsApp!</p>
              </div>
            ) : (
              history.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    <div
                      className={`inline-block p-3 rounded-lg max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-[#FF4F00] text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-1 h-6">
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    
                    {/* Botón de WhatsApp si el mensaje tiene la acción */}
                    {message.hasWhatsAppAction && message.sender === 'ai' && !message.isTyping && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => handleWhatsAppContact()}
                        className="mt-2 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span>Contactar por WhatsApp</span>
                      </motion.button>
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
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder={loading ? "RockuGPT está escribiendo..." : "Escribe tu mensaje..."}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF4F00] focus:border-transparent"
                aria-label="Mensaje para RockuGPT"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`px-4 py-2 bg-[#FF4F00] text-white rounded-r-lg ${
                  loading || !input.trim() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-orange-600 transition-colors'
                }`}
                aria-label="Enviar mensaje"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
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
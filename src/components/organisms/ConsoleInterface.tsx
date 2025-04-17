import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { consoleSlice } from '../../store/slices/consoleSlice';

const ConsoleInterface = () => {
  const dispatch = useDispatch();
  const { history, isTyping } = useSelector((state: RootState) => state.console);
  const [input, setInput] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = async (command: string) => {
    dispatch(consoleSlice.actions.addConsoleEntry({ type: 'input', content: command }));
    dispatch(consoleSlice.actions.setTypingStatus(true));
    
    const response = await processCommand(command);
    dispatch(consoleSlice.actions.addConsoleEntry({ type: 'output', content: response }));
    dispatch(consoleSlice.actions.setTypingStatus(false));
  };

  const processCommand = async (command: string): Promise<string> => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        return `Comandos disponibles:
- help: Muestra esta ayuda
- about: Información sobre mí
- skills: Mis habilidades técnicas
- projects: Mis proyectos
- contact: Información de contacto
- clear: Limpia la consola`;
      
      case 'clear':
        dispatch(consoleSlice.actions.clearConsole());
        return '';
      
      case 'about':
        return 'Richard Steven Levoyer Chavez - Full Stack Developer & AI Explorer';
      
      default:
        return `Comando no reconocido: "${command}". Escribe 'help' para ver los comandos disponibles.`;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-console-dark p-4 rounded-lg font-mono h-[60vh] overflow-y-auto flex flex-col scrollbar-custom"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-grow overflow-y-auto mb-4 scrollbar-custom">
        {history.map((entry, index) => (
          <div 
            key={index} 
            className={`py-1 ${entry.type === 'input' ? 'text-console-light' : 'text-console-gray'}`}
          >
            {entry.type === 'input' ? '> ' : ''}{entry.content}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-white/10 pt-4">
        <span className="text-console-light">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim() && !isTyping) {
              handleCommand(input.trim());
              setInput('');
            }
          }}
          disabled={isTyping}
          className="flex-grow bg-transparent border-none outline-none text-console-light ml-2 font-mono"
          aria-label="Entrada de consola"
        />
      </div>
      <div ref={consoleEndRef} />
    </motion.div>
  );
};

export default ConsoleInterface;
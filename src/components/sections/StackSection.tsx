import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Element } from 'react-scroll';

// Datos de tecnologías por categoría
const techStack = {
  frontend: [
    { name: 'React', icon: '⚛️', level: 'Avanzado' },
    { name: 'Redux Toolkit', icon: '🔄', level: 'Avanzado' },
    { name: 'TypeScript', icon: 'TS', level: 'Intermedio' },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢', level: 'Avanzado' },
    { name: 'Express', icon: '🚂', level: 'Avanzado' },
    { name: 'Fastify', icon: '⚡', level: 'Intermedio' },
    { name: 'PostgreSQL', icon: '🐘', level: 'Avanzado' },
    { name: 'REST APIs', icon: '🔌', level: 'Avanzado' },
  ],
  security: [
    { name: 'JWT', icon: '�', level: 'Avanzado' },
    { name: 'Argon2', icon: '🛡️', level: 'Intermedio' },
    { name: 'HttpOnly Cookies', icon: '🍪', level: 'Avanzado' },
  ],
  aiChatbots: [
    { name: 'builderbot.app', icon: '🤖', level: 'Experto' },
    { name: 'baileys', icon: '💬', level: 'Avanzado' },
    { name: 'Node.js Bots', icon: '�', level: 'Avanzado' },
  ],
  devops: [
    { name: 'Docker', icon: '�', level: 'Avanzado' },
    { name: 'Git/GitHub', icon: '📚', level: 'Avanzado' },
    { name: 'GitHub Actions', icon: '⚙️', level: 'Intermedio' },
  ],
};

// Componente para un nodo de tecnología
interface TechNodeProps {
  title: string;
  techs: Array<{ name: string; icon: string; level: string }>;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}

const TechNode: React.FC<TechNodeProps> = ({ title, techs, color, delay }) => {
  return (
    <motion.div
      className="w-full h-full bg-[#0a0a0a] border-2 border-gray-800 rounded-sm flex flex-col"
      style={{
        borderColor: color === 'blue' ? '#3b82f6' : 
                     color === 'green' ? '#22c55e' : 
                     color === 'orange' ? '#f97316' : 
                     color === 'purple' ? '#a855f7' : '#6b7280'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="px-4 py-3 flex justify-between items-center"
           style={{
             backgroundColor: color === 'blue' ? 'rgba(59, 130, 246, 0.2)' : 
                              color === 'green' ? 'rgba(34, 197, 94, 0.2)' : 
                              color === 'orange' ? 'rgba(249, 115, 22, 0.2)' : 
                              color === 'purple' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(107, 114, 128, 0.2)'
           }}>
        <h3 className="text-lg font-['Orbitron'] text-white flex items-center gap-2">
          <span className="text-xs opacity-70">[</span>
          {title}
          <span className="text-xs opacity-70">]</span>
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>
      
      <div className="p-4 space-y-2 flex-1">
        {techs.map((tech, index) => (
          <motion.div 
            key={tech.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: delay + index * 0.1 }}
            className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-b-0 hover:bg-gray-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-sm font-mono text-sm"
                    style={{
                      color: color === 'blue' ? '#93c5fd' : 
                             color === 'green' ? '#86efac' : 
                             color === 'orange' ? '#fdba74' : 
                             color === 'purple' ? '#d8b4fe' : '#9ca3af'
                    }}>
                {tech.icon}
              </span>
              <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${
              tech.level === 'Experto' ? 'bg-green-900 text-green-300 border border-green-700' :
              tech.level === 'Avanzado' ? 'bg-blue-900 text-blue-300 border border-blue-700' :
              tech.level === 'Intermedio' ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' :
              'bg-red-900 text-red-300 border border-red-700'
            }`}>
              {tech.level}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Componente principal para el diagrama de stack
const StackSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <Element name="stack">
      <section 
        id="stack"
        ref={sectionRef}
        className="min-h-screen w-full bg-[#0D0D0D] py-20 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-8 left-4 font-mono text-xs text-[#FF4F00] flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF4F00] rounded-full animate-pulse"></span>
          /stack_architecture
        </div>
        <div className="absolute top-8 right-4 font-mono text-xs text-[#FF4F00] flex items-center gap-2">
          build_version: 2.1.0
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        
        {/* Header de la sección */}
        <div className="max-w-6xl mx-auto mb-12 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-['Orbitron'] text-white">
              <span className="text-[#FF4F00]">&lt;</span> 
              STACK TECNOLÓGICO
              <span className="text-[#FF4F00]"> /&gt;</span>
            </h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-400 font-mono">
                <span className="text-[#FF4F00]">//</span> Arquitectura modular y escalable
              </p>
              <p className="text-gray-400 font-mono">
                <span className="text-[#FF4F00]">//</span> Tecnologías de última generación
              </p>
              <p className="text-gray-400 font-mono">
                <span className="text-[#FF4F00]">//</span> Integración continua y despliegue automatizado
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Contenedor responsivo para las tarjetas de tecnologías */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 relative">
            {/* Grid de fondo */}
            <div 
              className="absolute inset-0 -z-10 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle, rgba(255, 79, 0, 0.2) 1px, transparent 1px),
                  linear-gradient(to right, rgba(255, 79, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 79, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px, 60px 60px, 60px 60px'
              }}
            ></div>

            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full min-h-[300px]"
            >
              <TechNode 
                title="FRONTEND" 
                techs={techStack.frontend} 
                color="blue" 
                position="top-left" 
                delay={0.1} 
              />
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full min-h-[300px]"
            >
              <TechNode 
                title="BACKEND" 
                techs={techStack.backend} 
                color="green" 
                position="top-right" 
                delay={0.1} 
              />
            </motion.div>

            {/* Seguridad & Auth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-full min-h-[300px]"
            >
              <TechNode 
                title="SEGURIDAD & AUTH" 
                techs={techStack.security} 
                color="orange" 
                position="bottom-left" 
                delay={0.1} 
              />
            </motion.div>

            {/* AI Chatbots */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-full min-h-[300px]"
            >
              <TechNode 
                title="AI CHATBOTS" 
                techs={techStack.aiChatbots} 
                color="purple" 
                position="bottom-right" 
                delay={0.1} 
              />
            </motion.div>
          </div>

          {/* Nueva fila para DevOps */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="h-full min-h-[300px]"
            >
              <TechNode 
                title="DEVOPS & VCS" 
                techs={techStack.devops} 
                color="blue" 
                position="bottom-right" 
                delay={0.1} 
              />
            </motion.div>
          </div>

          {/* Leyenda */}
          <motion.div 
            className="bg-[#0a0a0a] p-4 border border-gray-800 rounded-sm backdrop-blur-sm max-w-xs mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 1 }}
          >
            <h4 className="text-sm font-['Orbitron'] text-[#FF4F00] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4F00] rounded-full animate-pulse"></span>
              Tech Stack
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 group">
                <span className="w-2 h-2 bg-blue-500 group-hover:animate-pulse"></span>
                <span className="text-gray-300">Frontend</span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="w-2 h-2 bg-green-500 group-hover:animate-pulse"></span>
                <span className="text-gray-300">Backend</span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="w-2 h-2 orange-500 group-hover:animate-pulse" style={{ backgroundColor: '#f97316' }}></span>
                <span className="text-gray-300">AI</span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="w-2 h-2 bg-purple-500 group-hover:animate-pulse"></span>
                <span className="text-gray-300">DevOps</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Nota al pie */}
        <motion.div 
          className="max-w-6xl mx-auto mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm text-gray-500 font-mono">
            <span className="text-[#FF4F00]">*</span> Stack tecnológico en constante evolución y mejora continua
          </p>
        </motion.div>
      </section>
    </Element>
  );
};

export default StackSection;
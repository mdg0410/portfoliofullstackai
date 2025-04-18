import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Element } from 'react-scroll';

// Datos de tecnologías por categoría
const techStack = {
  frontend: [
    { name: 'React', icon: '⚛️', level: 'Avanzado' },
    { name: 'Redux', icon: '🔄', level: 'Avanzado' },
    { name: 'TypeScript', icon: 'TS', level: 'Intermedio' },
    { name: 'Tailwind CSS', icon: '🌊', level: 'Avanzado' },
    { name: 'Framer Motion', icon: '🎬', level: 'Intermedio' },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢', level: 'Avanzado' },
    { name: 'Express', icon: '🚂', level: 'Avanzado' },
    { name: 'C#', icon: 'C#', level: 'Intermedio' },
    { name: 'MongoDB', icon: '🍃', level: 'Avanzado' },
    { name: 'REST APIs', icon: '🔌', level: 'Avanzado' },
  ],
  ai: [
    { name: 'n8n', icon: '📊', level: 'Experto' },
    { name: 'ChatGPT API', icon: '🤖', level: 'Avanzado' },
    { name: 'Prompt Engineering', icon: '✍️', level: 'Avanzado' },
    { name: 'Zoho CRM', icon: '📈', level: 'Avanzado' },
    { name: 'Integración AI', icon: '🧠', level: 'Intermedio' },
  ],
  devops: [
    { name: 'Git/GitHub', icon: '📚', level: 'Avanzado' },
    { name: 'CI/CD', icon: '🔄', level: 'Intermedio' },
    { name: 'Vercel', icon: '▲', level: 'Avanzado' },
    { name: 'AWS Basics', icon: '☁️', level: 'Básico' },
  ],
};

// Componente para un nodo de tecnología
interface TechNodeProps {
  title: string;
  techs: Array<{ name: string; icon: string; level: string }>;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}

const TechNode: React.FC<TechNodeProps> = ({ title, techs, position, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-[#0a0a0a] border-2 border-[#FF4F00] rounded-sm overflow-hidden h-full relative group`}
    >
      {/* Efecto de resplandor en hover */}
      <div className="absolute inset-0 bg-[#FF4F00] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      {/* Header del nodo */}
      <div className="bg-[#0D0D0D] px-4 py-3 flex justify-between items-center border-b-2 border-[#FF4F00]">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-[#FF4F00] animate-pulse"></div>
          <h3 className="text-lg font-['Orbitron'] text-white">{title}</h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-gray-500">status:</span>
          <span className="text-green-400">active</span>
        </div>
      </div>
      
      {/* Contenido del nodo */}
      <div className="p-4 space-y-3 relative">
        {techs.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            className="group/tech flex items-center justify-between p-2 bg-[#0D0D0D] border border-gray-800 hover:border-[#FF4F00] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#0D0D0D] border border-[#FF4F00] font-mono text-[#FF4F00] group-hover/tech:bg-[#FF4F00] group-hover/tech:text-white transition-all">
                {tech.icon}
              </div>
              <span className="text-gray-300 group-hover/tech:text-white transition-colors">{tech.name}</span>
            </div>
            <span className={`
              px-2 py-1 text-xs font-mono rounded
              ${tech.level === 'Experto' ? 'bg-green-900/30 text-green-400 border border-green-700' :
                tech.level === 'Avanzado' ? 'bg-blue-900/30 text-blue-400 border border-blue-700' :
                tech.level === 'Intermedio' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700' :
                'bg-red-900/30 text-red-400 border border-red-700'}
            `}>
              {tech.level}
            </span>
          </motion.div>
        ))}
        
        {/* Líneas decorativas */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF4F00] to-transparent opacity-20"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#FF4F00] to-transparent opacity-20"></div>
      </div>
      
      {/* Footer del nodo */}
      <div className="px-4 py-2 border-t border-gray-800 bg-[#0D0D0D]">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-gray-500">total: {techs.length}</span>
          <span className="text-[#FF4F00]">[ {position} ]</span>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal para el diagrama de stack
const StackSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  return (
    <Element name="stack">
      <section 
        id="stack"
        ref={sectionRef}
        className="min-h-screen w-full bg-[#0D0D0D] py-20 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas brutalistas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-6 left-4 font-mono text-xs text-[#FF4F00]">/stack</div>
        <div className="absolute top-6 right-4 font-mono text-xs text-[#FF4F00]">section.04</div>
        
        {/* Contenedor principal */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-['Orbitron'] text-white mb-4">
              <span className="text-[#FF4F00]">&lt;</span> 
              STACK TECNOLÓGICO
              <span className="text-[#FF4F00]"> /&gt;</span>
            </h2>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-[#FF4F00] text-white text-xs font-mono">
                SYSTEM_INFO
              </div>
              <p className="text-gray-400 font-mono text-sm">
                Visualización del ecosistema tecnológico y sus conexiones
              </p>
            </div>
          </div>
          
          {/* Grid container */}
          <div className="relative bg-[#0D0D0D] border-2 border-gray-800 p-8">
            {/* Fondo con patrón de puntos */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255, 79, 0, 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            
            {/* Grid de tecnologías */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {isInView && (
                <>
                  <TechNode 
                    title="FRONTEND"
                    techs={techStack.frontend}
                    position="top-left"
                    delay={0.2}
                  />
                  <TechNode 
                    title="BACKEND"
                    techs={techStack.backend}
                    position="top-right"
                    delay={0.4}
                  />
                  <TechNode 
                    title="AI & INTEGRACIÓN"
                    techs={techStack.ai}
                    position="bottom-left"
                    delay={0.6}
                  />
                  <TechNode 
                    title="DEVOPS"
                    techs={techStack.devops}
                    position="bottom-right"
                    delay={0.8}
                  />
                </>
              )}
            </div>
            
            {/* Líneas de conexión decorativas */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute top-1/2 left-0 w-full h-px bg-[#FF4F00] opacity-10"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 1 }}
              />
              <motion.div 
                className="absolute top-0 left-1/2 w-px h-full bg-[#FF4F00] opacity-10"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
          </div>
          
          {/* Footer con estadísticas */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0D0D0D] border border-gray-800 p-4">
              <div className="text-xs font-mono text-gray-500">Total Tech Stack</div>
              <div className="text-2xl font-['Orbitron'] text-[#FF4F00]">
                {Object.values(techStack).flat().length}
              </div>
            </div>
            <div className="bg-[#0D0D0D] border border-gray-800 p-4">
              <div className="text-xs font-mono text-gray-500">Stack Level</div>
              <div className="text-2xl font-['Orbitron'] text-green-500">Advanced</div>
            </div>
            <div className="bg-[#0D0D0D] border border-gray-800 p-4">
              <div className="text-xs font-mono text-gray-500">Update Status</div>
              <div className="text-2xl font-['Orbitron'] text-blue-500">Latest</div>
            </div>
            <div className="bg-[#0D0D0D] border border-gray-800 p-4">
              <div className="text-xs font-mono text-gray-500">System Status</div>
              <div className="text-2xl font-['Orbitron'] flex items-center text-green-500">
                Online
                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default StackSection;
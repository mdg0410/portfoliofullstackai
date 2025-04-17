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

// Conexiones entre categorías para el diagrama
const connections = [
  { from: 'frontend', to: 'backend', label: 'API Calls' },
  { from: 'backend', to: 'ai', label: 'IA Integration' },
  { from: 'ai', to: 'frontend', label: 'UI/UX Enhancement' },
  { from: 'devops', to: 'frontend', label: 'Deployment' },
  { from: 'devops', to: 'backend', label: 'CI/CD Pipeline' },
  { from: 'backend', to: 'devops', label: 'Monitoring' },
];

// Componente para un nodo de tecnología
interface TechNodeProps {
  title: string;
  techs: Array<{ name: string; icon: string; level: string }>;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}

const TechNode: React.FC<TechNodeProps> = ({ title, techs, color, position, delay }) => {
  // Determinar la posición CSS según la ubicación en el diagrama
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left': return 'top-0 left-0';
      case 'top-right': return 'top-0 right-0';
      case 'bottom-left': return 'bottom-0 left-0';
      case 'bottom-right': return 'bottom-0 right-0';
      default: return '';
    }
  };

  const positionClass = getPositionClasses();
  
  return (
    <motion.div
      className={`absolute w-64 ${positionClass} m-4 bg-[#0a0a0a] border-2 border-${color}-500 rounded-sm overflow-hidden`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header del nodo */}
      <div className={`bg-${color}-500 bg-opacity-20 px-4 py-2 flex justify-between items-center`}>
        <h3 className="text-lg font-['Orbitron'] text-white">{title}</h3>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
      </div>
      
      {/* Contenido del nodo */}
      <div className="p-3 space-y-2">
        {techs.map((tech, index) => (
          <div 
            key={tech.name}
            className="flex items-center justify-between py-1 border-b border-gray-800 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-800 font-mono">
                {tech.icon}
              </span>
              <span className="text-sm text-gray-300">{tech.name}</span>
            </div>
            <span className={`text-xs px-1 py-0.5 rounded ${
              tech.level === 'Experto' ? 'bg-green-900 text-green-300' :
              tech.level === 'Avanzado' ? 'bg-blue-900 text-blue-300' :
              tech.level === 'Intermedio' ? 'bg-yellow-900 text-yellow-300' :
              'bg-red-900 text-red-300'
            }`}>
              {tech.level}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Componente para una conexión entre nodos
interface ConnectionProps {
  from: string;
  to: string;
  label: string;
  delay: number;
  color: string;
}

const Connection: React.FC<ConnectionProps> = ({ from, to, label, delay, color }) => {
  // Esta es una versión simplificada. En una implementación completa,
  // necesitaríamos calcular las posiciones exactas de los nodos
  // para trazar líneas SVG precisas.
  
  // Determinamos clases CSS para la línea basada en los nodos a conectar
  const getConnectionClasses = () => {
    if ((from === 'frontend' && to === 'backend') ||
        (from === 'backend' && to === 'frontend')) {
      return 'left-[30%] top-[47%] w-[40%] rotate-90';
    }
    
    if ((from === 'backend' && to === 'ai') ||
        (from === 'ai' && to === 'backend')) {
      return 'left-[65%] top-[47%] w-[40%] rotate-90';
    }
    
    if ((from === 'ai' && to === 'frontend') ||
        (from === 'frontend' && to === 'ai')) {
      return 'left-[47%] top-[25%] w-[40%]';
    }
    
    if ((from === 'devops' && to === 'frontend') ||
        (from === 'frontend' && to === 'devops')) {
      return 'left-[25%] top-[65%] w-[30%] -rotate-45';
    }
    
    if ((from === 'devops' && to === 'backend') ||
        (from === 'backend' && to === 'devops')) {
      return 'left-[47%] top-[65%] w-[40%]';
    }
    
    return 'left-[50%] top-[50%] w-[20%]'; // fallback
  };
  
  const connectionClass = getConnectionClasses();
  
  return (
    <motion.div 
      className={`absolute ${connectionClass} h-px bg-${color}-500 flex items-center justify-center`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 0.6, scaleX: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Etiqueta de la conexión */}
      <div className={`absolute whitespace-nowrap px-2 py-1 bg-[#0D0D0D] text-${color}-500 text-xs font-mono border border-${color}-500 transform -translate-y-3`}>
        {label}
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
        
        {/* Header de la sección */}
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-4xl font-['Orbitron'] text-white">
            <span className="text-[#FF4F00]">&lt;</span> 
            STACK TECNOLÓGICO
            <span className="text-[#FF4F00]"> /&gt;</span>
          </h2>
          <p className="mt-2 text-gray-400 font-mono max-w-2xl">
            // Visualización del ecosistema tecnológico y conexiones entre las herramientas
          </p>
        </div>
        
        {/* Diagrama de conexión */}
        <div className="max-w-6xl mx-auto bg-[#0D0D0D] h-[80vh] border border-gray-800 rounded relative mt-12">
          {/* Cuadrícula de fondo */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 79, 0, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          
          {/* Nodos de tecnología */}
          {isInView && (
            <>
              <TechNode 
                title="FRONTEND" 
                techs={techStack.frontend} 
                color="blue" 
                position="top-left" 
                delay={0.2} 
              />
              
              <TechNode 
                title="BACKEND" 
                techs={techStack.backend} 
                color="green" 
                position="top-right" 
                delay={0.5} 
              />
              
              <TechNode 
                title="AI & INTEGRACIÓN" 
                techs={techStack.ai} 
                color="orange" 
                position="bottom-right" 
                delay={0.8} 
              />
              
              <TechNode 
                title="DEVOPS" 
                techs={techStack.devops} 
                color="purple" 
                position="bottom-left" 
                delay={1.1} 
              />
              
              {/* Conexiones entre nodos */}
              {connections.map((conn, index) => (
                <Connection 
                  key={`${conn.from}-${conn.to}`}
                  from={conn.from} 
                  to={conn.to} 
                  label={conn.label} 
                  delay={1.5 + index * 0.2}
                  color={
                    conn.from === 'frontend' || conn.to === 'frontend' ? 'blue' :
                    conn.from === 'backend' || conn.to === 'backend' ? 'green' :
                    conn.from === 'ai' || conn.to === 'ai' ? 'orange' : 'purple'
                  }
                />
              ))}
              
              {/* Elementos decorativos del diagrama */}
              <motion.div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#FF4F00] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full border border-[#FF4F00] flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ duration: 1, delay: 2.3 }}
                >
                  <motion.div 
                    className="text-3xl text-[#FF4F00] font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.6 }}
                  >
                    RS
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
          
          {/* Leyenda del diagrama */}
          <div className="absolute bottom-4 left-4 bg-[#0a0a0a] p-3 border border-gray-800">
            <h4 className="text-sm font-mono text-[#FF4F00] mb-2">Leyenda:</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500"></span>
                <span className="text-gray-300">Frontend</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500"></span>
                <span className="text-gray-300">Backend</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500"></span>
                <span className="text-gray-300">AI & Integración</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500"></span>
                <span className="text-gray-300">DevOps</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Nota al pie */}
        <div className="max-w-6xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-500 font-mono">
            * El diagrama visualiza la interacción entre las tecnologías en mi stack de desarrollo
          </p>
        </div>
      </section>
    </Element>
  );
};

export default StackSection;
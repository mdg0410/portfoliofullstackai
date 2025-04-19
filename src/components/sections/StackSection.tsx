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
  return (
    <motion.div
      className={`w-full h-full bg-[#0a0a0a] border-2 border-${color}-500 rounded-sm flex flex-col`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`bg-${color}-500 bg-opacity-20 px-4 py-3 flex justify-between items-center`}>
        <h3 className="text-lg font-['Orbitron'] text-white flex items-center gap-2">
          <span className="text-xs text-${color}-400">[</span>
          {title}
          <span className="text-xs text-${color}-400">]</span>
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
              <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-sm font-mono text-${color}-400 text-sm">
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

// Componente para una conexión entre nodos
interface ConnectionProps {
  from: string;
  to: string;
  label: string;
  delay: number;
  color: string;
}

const Connection: React.FC<ConnectionProps> = ({ from, to, label, delay, color }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <motion.div
        className={`absolute h-[2px] bg-${color}-500`}
        style={{
          width: '100%',
          transformOrigin: from === 'frontend' || from === 'ai' ? 'left' : 'right'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.6 }}
        transition={{ duration: 0.8, delay }}
      >
        <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-3 px-2 py-1 bg-[#0D0D0D] text-${color}-500 text-xs font-mono border border-${color}-500 whitespace-nowrap z-10`}>
          {label}
        </div>
      </motion.div>
    </div>
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
        className="min-h-screen w-full bg-[#0D0D0D] py-24 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas mejoradas */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-8 left-4 font-mono text-xs text-[#FF4F00] flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF4F00] rounded-full animate-pulse"></span>
          /stack_architecture
        </div>
        <div className="absolute top-8 right-4 font-mono text-xs text-[#FF4F00] flex items-center gap-2">
          build_version: 2.0.4
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        
        {/* Header mejorado de la sección */}
        <div className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
        
        {/* Grid Container Principal */}
        <div className="max-w-7xl mx-auto bg-[#0D0D0D] h-[80vh] border border-gray-800 rounded-lg relative mt-8">
          {/* Grid de fondo */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(255, 79, 0, 0.2) 1px, transparent 1px),
                linear-gradient(to right, rgba(255, 79, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 79, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px, 60px 60px, 60px 60px'
            }}
          ></div>

          {/* Grid Layout Principal */}
          <div className="grid grid-cols-5 grid-rows-5 gap-8 h-full p-8">
            {isInView && (
              <>
                {/* Frontend y Backend - Primera Fila */}
                <div className="col-span-2 row-span-2">
                  <TechNode 
                    title="FRONTEND" 
                    techs={techStack.frontend} 
                    color="blue" 
                    position="top-left" 
                    delay={0.2} 
                  />
                </div>

                {/* Conexión Frontend-Backend */}
                <div className="row-span-2 col-start-3 row-start-1 flex items-center">
                  <Connection 
                    from="frontend"
                    to="backend"
                    label="API REST"
                    delay={1.5}
                    color="blue"
                  />
                </div>

                <div className="col-span-2 row-span-2 col-start-4 row-start-1">
                  <TechNode 
                    title="BACKEND" 
                    techs={techStack.backend} 
                    color="green" 
                    position="top-right" 
                    delay={0.5} 
                  />
                </div>

                {/* AI y DevOps - Segunda Fila */}
                <div className="col-span-2 row-span-2 row-start-3">
                  <TechNode 
                    title="AI & INTEGRACIÓN" 
                    techs={techStack.ai} 
                    color="orange" 
                    position="bottom-left" 
                    delay={0.8} 
                  />
                </div>

                {/* Conexiones Verticales */}
                <div className="row-span-2 col-start-3 row-start-3 grid grid-rows-2 gap-4">
                  {/* Conexión Frontend-AI */}
                  <div className="relative">
                    <Connection 
                      from="frontend"
                      to="ai"
                      label="UI Enhancement"
                      delay={1.8}
                      color="orange"
                    />
                  </div>
                  {/* Conexión Backend-DevOps */}
                  <div className="relative">
                    <Connection 
                      from="backend"
                      to="devops"
                      label="CI/CD Pipeline"
                      delay={2.1}
                      color="purple"
                    />
                  </div>
                </div>

                <div className="col-span-2 row-span-2 col-start-4 row-start-3">
                  <TechNode 
                    title="DEVOPS" 
                    techs={techStack.devops} 
                    color="purple" 
                    position="bottom-right" 
                    delay={1.1} 
                  />
                </div>

                {/* Leyenda - Fila Inferior */}
                <div className="col-start-3 row-start-5">
                  <motion.div 
                    className="bg-[#0a0a0a] p-4 border border-gray-800 rounded-sm backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8 }}
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
                        <span className="w-2 h-2 bg-orange-500 group-hover:animate-pulse"></span>
                        <span className="text-gray-300">AI</span>
                      </div>
                      <div className="flex items-center gap-2 group">
                        <span className="w-2 h-2 bg-purple-500 group-hover:animate-pulse"></span>
                        <span className="text-gray-300">DevOps</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Nota al pie mejorada */}
        <motion.div 
          className="max-w-6xl mx-auto mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
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
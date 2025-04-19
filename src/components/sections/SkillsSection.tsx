import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Element } from 'react-scroll';

// Datos de habilidades organizados por categoría
const skillsData = {
  frontend: [
    { name: 'React', level: 92 },
    { name: 'Redux', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 80 },
    { name: 'CSS/Tailwind', level: 88 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 82 },
    { name: 'C#', level: 75 },
    { name: 'MongoDB', level: 78 },
    { name: 'REST APIs', level: 87 },
  ],
  aiTools: [
    { name: 'n8n', level: 84 },
    { name: 'Prompt Engineering', level: 90 },
    { name: 'ChatGPT Integration', level: 88 },
    { name: 'Zoho CRM', level: 82 },
    { name: 'Socket.IO', level: 75 },
  ],
  devOps: [
    { name: 'Git/GitHub', level: 85 },
    { name: 'CI/CD', level: 70 },
    { name: 'Vercel', level: 80 },
    { name: 'Docker', level: 65 },
    { name: 'AWS Basics', level: 60 },
  ]
};

// Componente para una barra individual de skill
interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  category: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, index, category }) => {
  // Determinar el color según el nivel de habilidad
  const getBarColor = (level: number) => {
    if (level >= 90) return '#00FF66'; // Verde brillante para niveles altos
    if (level >= 80) return '#27AE60'; // Verde para niveles buenos
    if (level >= 70) return '#FFD700'; // Amarillo para nivel medio
    if (level >= 60) return '#F39C12'; // Naranja para nivel básico
    return '#FF4F00'; // Naranja brutalista para niveles iniciales
  };
  
  // Calcular demora para la animación secuencial
  const delay = 0.1 + index * 0.1;
  
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-mono text-gray-300">{name}</span>
        <div className="flex items-center">
          <span className="text-xs font-mono mr-2 text-[#FF4F00]">{level}%</span>
          <span className="text-xs font-mono text-gray-500">{Math.round(level * 1.28)}MB</span>
        </div>
      </div>
      
      {/* Barra de progreso con efecto de carga */}
      <div className="relative h-3 bg-gray-800 border border-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="absolute h-full"
          style={{ backgroundColor: getBarColor(level) }}
        />
        
        {/* Líneas verticales decorativas en la barra */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-full w-px bg-gray-700"
            style={{ left: `${(i+1) * 10}%` }}
          />
        ))}
        
        {/* Efecto de escaneo */}
        <motion.div
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute top-0 h-full w-1 bg-white opacity-30"
        />
      </div>
    </div>
  );
};

// Componente para un grupo de habilidades (categoría)
interface SkillCategoryProps {
  title: string;
  skills: { name: string; level: number }[];
  delay: number;
  icon: React.ReactNode; // Cambiamos JSX.Element por React.ReactNode
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, delay, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay,
          }
        }
      }}
      className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-sm"
    >
      {/* Header de la categoría */}
      <div className="flex items-center mb-4 border-b border-gray-800 pb-2">
        <div className="mr-3 text-[#FF4F00]">
          {icon}
        </div>
        <h3 className="text-xl font-['Orbitron'] text-white">{title}</h3>
        <div className="ml-auto flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
          <span className="text-xs font-mono text-gray-400">ACTIVO</span>
        </div>
      </div>
      
      {/* Lista de habilidades */}
      <div>
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            name={skill.name} 
            level={skill.level} 
            index={index} 
            category={title.toLowerCase()} 
          />
        ))}
      </div>
      
      {/* Métricas de categoría */}
      <div className="mt-4 border-t border-gray-800 pt-2 flex justify-between">
        <div>
          <span className="text-xs font-mono text-gray-500">Total Skills: </span>
          <span className="text-xs font-mono text-white">{skills.length}</span>
        </div>
        <div>
          <span className="text-xs font-mono text-gray-500">Avg Level: </span>
          <span className="text-xs font-mono text-[#FF4F00]">
            {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal de la sección de habilidades
const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Iconos para las categorías
  const icons = {
    frontend: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    backend: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    aiTools: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    devOps: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  return (
    <Element name="skills">
      <section 
        id="skills"
        ref={sectionRef}
        className="min-h-screen w-full bg-[#0D0D0D] py-20 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas brutalistas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-6 left-4 font-mono text-xs text-[#FF4F00]">/skills</div>
        <div className="absolute top-6 right-4 font-mono text-xs text-[#FF4F00]">section.03</div>
        
        {/* Header de la sección */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-4xl font-['Orbitron'] text-white mb-4">
            <span className="text-[#FF4F00]">&lt;</span> 
            HABILIDADES TÉCNICAS 
            <span className="text-[#FF4F00]"> /&gt;</span>
          </h2>
          
          <div className="flex items-center mb-8 border-b border-gray-800 pb-4">
            <div className="mr-3 px-3 py-1 bg-[#FF4F00] text-white text-xs font-mono">
              SYSTEM_INFO
            </div>
            <div className="font-mono text-sm text-gray-400">
              Monitoreo de recursos técnicos - RAM/CPU utilizada por tecnología
            </div>
            <div className="ml-auto flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-xs font-mono text-gray-400">Actualizado: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Dashboard principal - estilo monitor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillCategory
              title="FRONTEND"
              skills={skillsData.frontend}
              delay={0.3}
              icon={icons.frontend}
            />
            <SkillCategory
              title="BACKEND"
              skills={skillsData.backend}
              delay={0.5}
              icon={icons.backend}
            />
            <SkillCategory
              title="IA & INTEGRACIÓN"
              skills={skillsData.aiTools}
              delay={0.7}
              icon={icons.aiTools}
            />
            <SkillCategory
              title="DEVOPS"
              skills={skillsData.devOps}
              delay={0.9}
              icon={icons.devOps}
            />
          </div>
          
          {/* Panel de métricas generales */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-sm">
              <div className="text-xs font-mono text-gray-500 mb-1">TOTAL SKILLS</div>
              <div className="text-2xl font-['Orbitron'] text-[#FF4F00]">
                {Object.values(skillsData).flat().length}
              </div>
            </div>
            <div className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-sm">
              <div className="text-xs font-mono text-gray-500 mb-1">AVG PERFORMANCE</div>
              <div className="text-2xl font-['Orbitron'] text-green-500">
                {Math.round(
                  Object.values(skillsData)
                    .flat()
                    .reduce((sum, skill) => sum + skill.level, 0) / 
                    Object.values(skillsData).flat().length
                )}%
              </div>
            </div>
            <div className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-sm">
              <div className="text-xs font-mono text-gray-500 mb-1">TOP SKILL</div>
              <div className="text-2xl font-['Orbitron'] text-white">
                {Object.values(skillsData)
                  .flat()
                  .sort((a, b) => b.level - a.level)[0].name}
              </div>
            </div>
            <div className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-sm">
              <div className="text-xs font-mono text-gray-500 mb-1">STATUS</div>
              <div className="text-2xl font-['Orbitron'] text-green-500 flex items-center">
                ONLINE
                <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
          
          {/* Footer de la sección */}
          <div className="mt-12 flex justify-between items-center text-xs font-mono text-gray-500 border-t border-gray-800 pt-4">
            <div>SKILL_DASHBOARD v2.5.0</div>
            <div className="flex items-center">
              <span>&#169; 2025 Richard Steven Levoyer</span>
              <div className="ml-4 h-1 w-8 bg-[#FF4F00]"></div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default SkillsSection;
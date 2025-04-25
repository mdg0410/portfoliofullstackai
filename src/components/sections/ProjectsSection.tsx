import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';

// Datos de proyectos
const projects = [
  {
    id: 1,
    title: 'Karibu',
    subtitle: 'Plataforma MERN de Karaoke',
    description: 'Sistema de karaoke digital con selección de canciones, búsqueda por artista/género y sala de canto virtual con puntuaciones en tiempo real.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'WebAudio API'],
    image: '/images/projects/karibu-project.jpg',
    link: 'https://karibu-karaoke.vercel.app',
    github: 'https://github.com/stevenlevoyer/karibu-karaoke',
  },
  {
    id: 2,
    title: 'Ghostshop',
    subtitle: 'Automatización n8n + CRM',
    description: 'Solución de automatización para comercio electrónico que integra n8n con Zoho CRM para gestionar flujos de trabajo y datos de clientes eficientemente.',
    tech: ['n8n', 'Zoho CRM', 'REST API', 'Node.js', 'React', 'PostgreSQL'],
    image: '/images/projects/ghostshop-project.jpg',
    link: 'https://ghostshop.io',
    github: 'https://github.com/stevenlevoyer/ghostshop',
  },
  {
    id: 3,
    title: 'RockuGPT',
    subtitle: 'Asistente AI Personalizado',
    description: 'Asistente virtual basado en LLM, personalizado con mi estilo y conocimiento para responder consultas sobre desarrollo y tecnología.',
    tech: ['OpenAI API', 'React', 'Node.js', 'Redis', 'TypeScript', 'Framer Motion'],
    image: '/images/projects/rockugpt-project.jpg',
    link: 'https://rockugpt.dev',
    github: 'https://github.com/stevenlevoyer/rockugpt',
  },
  {
    id: 4,
    title: 'PDF-Extractor',
    subtitle: 'Herramienta de Procesamiento',
    description: 'Aplicación web para extraer, buscar y manipular contenido de archivos PDF con interfaz de usuario intuitiva y procesamiento por lotes.',
    tech: ['PDF.js', 'React', 'Express', 'Node.js', 'MongoDB', 'AWS S3'],
    image: '/images/projects/pdf-extractor-project.jpg',
    link: 'https://pdf-extractor.netlify.app',
    github: 'https://github.com/stevenlevoyer/pdf-extractor',
  },
];

// Componente para un proyecto individual
const Project: React.FC<{
  project: typeof projects[0];
  index: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}> = ({ project, index, currentIndex, setCurrentIndex }) => {
  // Calcular la posición del proyecto en el carrusel
  const position = index - currentIndex;
  
  // Determinar si está activo el proyecto actual
  const isActive = position === 0;
  
  // Calcular propiedades basadas en la posición
  const opacity = Math.max(0, 1 - Math.abs(position) * 0.5);
  const scale = Math.max(0.7, 1 - Math.abs(position) * 0.15);
  const zIndex = 10 - Math.abs(position);
  
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 ${isActive ? 'z-10' : ''}`}
      initial={false}
      animate={{
        x: `${position * 100}%`,
        opacity,
        scale,
        zIndex,
        rotateY: position * -10, // Rotación 3D
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => !isActive && setCurrentIndex(index)}
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`bg-[#111111] w-full max-w-3xl h-[80vh] rounded border-2 ${isActive ? 'border-[#FF4F00]' : 'border-gray-800'} overflow-hidden shadow-xl transform transition-all duration-300`}
        style={{height: '100%'}}
      >
        {/* Header del proyecto */}
        <div className="p-4 border-b-2 border-gray-800 flex justify-between items-center bg-[#0a0a0a]">
          <div>
            <h3 className="text-2xl font-['Orbitron'] text-white">{project.title}</h3>
            <p className="text-sm text-gray-400">{project.subtitle}</p>
          </div>
          <div className="flex space-x-2">
            {isActive && (
              <>
                <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
              </>
            )}
          </div>
        </div>
        
        {/* Contenido del proyecto */}
        <div className="flex flex-col md:flex-row h-[calc(100%-64px)]">
          {/* Imagen del proyecto */}
          <div className="md:w-1/2 h-64 md:h-auto bg-black relative overflow-hidden">
            {isActive ? (
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
              />
            ) : null}
            
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${project.image || 'https://via.placeholder.com/500x300?text=Proyecto'})`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Overlay con información flotante */}
            {isActive && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 p-3 bg-black bg-opacity-75 border border-gray-700 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="font-mono text-xs text-[#FF4F00]">
                  // Stack principal
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {project.tech.slice(0, 4).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-2 py-1 text-xs font-mono bg-gray-800 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Detalles del proyecto */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#FF4F00] mb-2">
                # PROYECTO {project.id.toString().padStart(2, '0')}
              </div>
              
              <p className="text-gray-300 mb-6">
                {project.description}
              </p>
              
              <div className="border-t border-gray-800 pt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-mono text-[#FF4F00]">Tecnologías:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            {isActive && (
              <motion.div 
                className="mt-6 flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-[#FF4F00] text-white font-mono hover:bg-opacity-90 transition-colors border-2 border-[#FF4F00]"
                >
                  VER PROYECTO
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-transparent text-[#FF4F00] font-mono hover:bg-gray-800 transition-colors border-2 border-[#FF4F00]"
                >
                  CÓDIGO
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal de la sección de proyectos
const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Navegación entre proyectos
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  // Indicador de progreso
  const progressPercentage = ((currentIndex + 1) / projects.length) * 100;

  return (
    <Element name="projects">
      <section 
        id="projects"
        ref={sectionRef}
        className="h-screen w-full bg-[#0D0D0D] flex flex-col relative overflow-hidden"
      >
        {/* Líneas decorativas brutalistas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-6 left-4 font-mono text-xs text-[#FF4F00]">/projects</div>
        <div className="absolute top-6 right-4 font-mono text-xs text-[#FF4F00]">section.03</div>
        
        {/* Header de la sección */}
        <div className="pt-20 pb-4 px-6 md:px-10">
          <h2 className="text-4xl font-['Orbitron'] text-white">
            <span className="text-[#FF4F00]">&lt;</span> 
            PROYECTOS 
            <span className="text-[#FF4F00]"> /&gt;</span>
          </h2>
          <p className="mt-2 text-gray-400 font-mono max-w-2xl">
            // Desplázate horizontalmente para explorar mis proyectos destacados
          </p>
        </div>
        
        {/* Contenedor del carrusel */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((project, index) => (
              <Project 
                key={project.id}
                project={project}
                index={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            ))}
          </div>
        </div>
        
        {/* Controles de navegación */}
        <div className="h-24 px-6 md:px-10 flex justify-between items-center border-t border-gray-800">
          <div className="flex items-center space-x-6">
            <button 
              onClick={prevProject}
              className="w-12 h-12 border border-gray-700 hover:border-[#FF4F00] text-white flex items-center justify-center transition-colors"
              aria-label="Proyecto anterior"
            >
              <span className="text-2xl">&larr;</span>
            </button>
            <button 
              onClick={nextProject}
              className="w-12 h-12 border border-gray-700 hover:border-[#FF4F00] text-white flex items-center justify-center transition-colors"
              aria-label="Siguiente proyecto"
            >
              <span className="text-2xl">&rarr;</span>
            </button>
          </div>
          
          {/* Indicador de progreso */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-mono text-gray-400">
              {currentIndex + 1}/{projects.length}
            </span>
            <div className="w-40 h-2 bg-gray-800">
              <motion.div 
                className="h-full bg-[#FF4F00]" 
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Metadatos del proyecto */}
          <div className="hidden md:block text-right">
            <span className="block text-sm font-mono text-gray-400">Proyecto seleccionado:</span>
            <span className="block text-lg font-['Orbitron'] text-white">
              {projects[currentIndex].title}
            </span>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ProjectsSection;
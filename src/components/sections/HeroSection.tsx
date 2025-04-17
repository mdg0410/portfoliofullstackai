import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-scroll';
import BlinkingCursor from '../atoms/BlinkingCursor';

const HeroSection: React.FC = () => {
  // Animaciones con Framer Motion
  const controls = useAnimation();
  const taglineControls = useAnimation();

  useEffect(() => {
    // Secuencia de animación en cascada
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 });
      await taglineControls.start({ 
        opacity: 1, 
        transition: { 
          delay: 0.3,
          staggerChildren: 0.08 
        } 
      });
    };
    
    sequence();
  }, [controls, taglineControls]);

  // Configurar la animación de typing para el tagline
  const tagline = "Cambiando el mundo, un prompt a la vez.";
  const taglineChars = tagline.split("");

  return (
    <section 
      id="hero"
      className="h-screen w-full bg-[#0D0D0D] flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Líneas decorativas brutalistas */}
      <div className="absolute top-[20%] left-0 h-px w-full bg-[#FF4F00] opacity-30" />
      <div className="absolute top-[80%] left-0 h-px w-full bg-[#FF4F00] opacity-30" />
      <div className="absolute top-0 left-[20%] h-full w-px bg-[#FF4F00] opacity-30" />
      <div className="absolute top-0 left-[80%] h-full w-px bg-[#FF4F00] opacity-30" />
      
      {/* Coordenadas brutalistas */}
      <div className="absolute top-4 left-4 font-mono text-xs text-[#FF4F00] opacity-50">
        x: 0, y: 0
      </div>
      <div className="absolute top-4 right-4 font-mono text-xs text-[#FF4F00] opacity-50">
        x: 1920, y: 0
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-xs text-[#FF4F00] opacity-50">
        x: 0, y: 1080
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-xs text-[#FF4F00] opacity-50">
        x: 1920, y: 1080
      </div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="max-w-4xl mx-auto text-center z-10"
      >
        {/* Meta-data brutalista */}
        <div className="inline-block mb-2 px-3 py-1 border border-[#FF4F00] text-xs font-mono text-[#FF4F00]">
          &lt;dev-name role="full-stack" status="online" /&gt;
        </div>
        
        {/* Nombre principal */}
        <h1 className="text-4xl md:text-7xl font-['Orbitron'] text-white font-bold mb-4 tracking-wider">
          RICHARD STEVEN 
          <span className="block md:inline text-[#FF4F00]"> LEVOYER CHAVEZ</span>
        </h1>
        
        {/* Tagline animado */}
        <div className="h-8 flex justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={taglineControls}
            className="flex items-center font-['Urbanist'] text-gray-300 text-xl"
          >
            {taglineChars.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                transition={{
                  duration: 0.1
                }}
              >
                {char}
              </motion.span>
            ))}
            <BlinkingCursor />
          </motion.div>
        </div>
        
        {/* Badges de tecnologías */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Full Stack', 'React', 'C#', 'AI Integration', 'n8n', 'Prompt Engineer'].map((tech) => (
            <span 
              key={tech}
              className="inline-block px-3 py-1 bg-gray-800 border border-gray-700 text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="projects"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#0D0D0D',
                color: '#FF4F00',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#FF4F00] text-white font-['Orbitron'] text-lg border-2 border-[#FF4F00] transition-all"
            >
              VER PROYECTOS
            </motion.button>
          </Link>
          
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#FF4F00',
                color: '#0D0D0D',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent text-[#FF4F00] font-['Orbitron'] text-lg border-2 border-[#FF4F00] transition-all"
            >
              CONTACTAR
            </motion.button>
          </Link>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">SCROLL DOWN</span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="#FF4F00" strokeWidth="2" />
              <circle cx="8" cy="8" r="3" fill="#FF4F00" />
            </svg>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
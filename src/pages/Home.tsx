import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setActiveSection } from '../store/slices/navigationSlice';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import StackSection from '../components/sections/StackSection';
import ContactSection from '../components/sections/ContactSection';
import { Element, Events } from 'react-scroll';
import { AnimatePresence } from 'framer-motion';
import AIChat from '../components/molecules/AIChat';
import BugHuntGame from '../components/molecules/BugHuntGame';

const Home = () => {
  const dispatch = useAppDispatch();
  const [chatOpen, setChatOpen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const { mode } = useSelector((state: RootState) => state.theme);

  // Configurar eventos de scroll para actualizar la sección activa
  useEffect(() => {
    const handleSetActive = (to: string) => {
      dispatch(setActiveSection(to as any));
    };

    Events.scrollEvent.register('begin', (to) => {
      console.log('begin', to);
    });

    Events.scrollEvent.register('end', (to) => {
      console.log('end', to);
    });

    // Registrar la actualización de sección activa
    ['hero', 'about', 'projects', 'skills', 'stack', 'contact'].forEach(section => {
      Events.scrollEvent.register(section, () => handleSetActive(section));
    });

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
      ['hero', 'about', 'projects', 'skills', 'stack', 'contact'].forEach(section => {
        Events.scrollEvent.remove(section);
      });
    };
  }, [dispatch]);

  return (
    <div className="relative">
      {/* Contenedor principal de secciones */}
      <main className="w-full">
        <Element name="hero">
          <HeroSection />
        </Element>
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <StackSection />
        <ContactSection />
      </main>

      {/* Navegación lateral */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <ul className="space-y-4">
          {['hero', 'about', 'projects', 'skills', 'stack', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="group relative flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="absolute right-full mr-3 text-xs uppercase text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {section}
                </span>
                <span className="block w-3 h-3 border border-[#FF4F00] bg-transparent group-hover:bg-[#FF4F00] transition-colors"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botones flotantes */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-4 items-end">
        <button
          onClick={() => setGameActive(!gameActive)}
          className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Jugar a buscar bugs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </button>

        <button
          onClick={() => setChatOpen(true)}
          className="w-16 h-16 rounded-full bg-[#FF4F00] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Abrir chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>

      {/* Componentes modales */}
      <AnimatePresence>
        {gameActive && <BugHuntGame />}
        <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </AnimatePresence>
    </div>
  );
};

export default Home;
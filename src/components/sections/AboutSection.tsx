import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Element } from 'react-scroll';
import BlinkingCursor from '../atoms/BlinkingCursor';

// Datos del perfil (normalmente vendrían de una API o archivo JSON)
const profileData = {
  "nombre_completo": "Richard Steven Levoyer Chavez",
  "alias": "Richard / mdg0410",
  "rol_profesional": "Desarrollador Full Stack",
  "stack_actual": ["React", "Redux Toolkit", "Node.js", "Express", "Fastify", "PostgreSQL"],
  "lenguajes": ["JavaScript", "TypeScript"],
  "tecnologías_seguridad": ["JWT con rotación", "Argon2", "Cookies HttpOnly", "Arquitectura de autenticación"],
  "especializaciones": [ "APIs REST robustas", "Seguridad avanzada", "Chatbots conversacionales"],
  "estudios": ["ITSCO 2022", "Bootcamp Microverse", "Oracle Alura"],
  "proyectos_destacados": ["CRM Whastapp", "WhatsApp Chatbot", "Alemana de Serigrafia SPA"],
  "objetivos": ["Chatbots con builderbot.app", "APIs REST seguras", "Contenedorización Docker"],
  "intereses": ["Bases de datos relacionales", "DevOps con CI/CD", "Arquitectura de seguridad"],
  "estilo_portafolio": {"estética":"Brutalista","scroll":"Interactivo","enfoque":"Full-Stack","blog":"Excluido"},
  "herramientas_de_trabajo": ["Docker", "GitHub", "GitHub Copilot", "PostgreSQL"]
};

interface LogEntry {
  timestamp: string;
  type: 'system' | 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: string[];
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Generar logs de sistema desde los datos del perfil
  useEffect(() => {
    const generatedLogs: LogEntry[] = [
      {
        timestamp: '2025-04-17T08:00:00',
        type: 'system',
        message: 'Iniciando sistema de perfil profesional...',
      },
      {
        timestamp: '2025-04-17T08:00:01',
        type: 'info',
        message: 'Cargando datos de identidad',
        details: [
          `> Nombre: ${profileData.nombre_completo}`,
          `> Alias: ${profileData.alias}`,
          `> Rol: ${profileData.rol_profesional}`
        ]
      },
      {
        timestamp: '2025-04-17T08:00:03',
        type: 'success',
        message: 'Stack tecnológico detectado',
        details: [
          `> Frameworks: ${profileData.stack_actual.join(', ')}`,
          `> Lenguajes: ${profileData.lenguajes.join(', ')}`
        ]
      },
      {
        timestamp: '2025-04-17T08:00:05',
        type: 'info',
        message: 'Cargando especializaciones',
        details: profileData.especializaciones.map(esp => `> ${esp}`)
      },
      {
        timestamp: '2025-04-17T08:00:07',
        type: 'warning',
        message: 'Tecnologías de seguridad detectadas',
        details: profileData.tecnologías_seguridad.map(tech => `> ${tech}`)
      },
      {
        timestamp: '2025-04-17T08:00:09',
        type: 'info',
        message: 'Formación académica',
        details: profileData.estudios.map(est => `> ${est}`)
      },
      {
        timestamp: '2025-04-17T08:00:11',
        type: 'success',
        message: 'Proyectos destacados',
        details: profileData.proyectos_destacados.map(proj => `> ${proj}`)
      },
      {
        timestamp: '2025-04-17T08:00:13',
        type: 'system',
        message: 'Analizando objetivos profesionales...',
        details: profileData.objetivos.map(obj => `> ${obj}`)
      },
      {
        timestamp: '2025-04-17T08:00:15',
        type: 'error',
        message: 'ALERTA: Alta capacidad de innovación detectada',
        details: profileData.intereses.map(int => `> ${int}`)
      },
      {
        timestamp: '2025-04-17T08:00:17',
        type: 'system',
        message: 'Perfil completo cargado. Listo para explorar.',
      }
    ];

    setLogs(generatedLogs);
  }, []);

  // Controlar la aparición secuencial de logs cuando la sección está en vista
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      if (currentLogIndex < logs.length) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setCurrentLogIndex(prev => prev + 1);
          setIsTyping(false);
        }, 1000); // Reducido para mejor experiencia de usuario
        
        return () => clearTimeout(timer);
      }
    } else {
      controls.start('hidden');
      setCurrentLogIndex(0);
    }
  }, [isInView, controls, currentLogIndex, logs.length]);

  // Obtener el color según el tipo de log
  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-gray-300';
      case 'info': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <Element name="about">
      <section 
        id="about"
        ref={sectionRef}
        className="min-h-screen w-full bg-[#0D0D0D] flex items-center justify-center py-20 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas brutalistas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-6 left-4 font-mono text-xs text-[#FF4F00]">/about</div>
        <div className="absolute top-6 right-4 font-mono text-xs text-[#FF4F00]">section.02</div>
        
        {/* Terminal con logs */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="w-full max-w-4xl bg-[#0a0a0a] border border-gray-800 rounded-sm shadow-2xl overflow-hidden"
        >
          {/* Barra de título de terminal */}
          <div className="flex items-center bg-gray-900 px-4 py-2">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center font-mono text-sm text-gray-400">richard@portfolio: ~/about</div>
            <div className="font-mono text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
          </div>
          
          {/* Contenido de la terminal */}
          <div className="p-4 font-mono text-sm h-[500px] overflow-y-auto bg-gray-950 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {logs.slice(0, currentLogIndex).map((log, index) => (
              <motion.div 
                key={index} 
                className="mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timestamp y tipo de log */}
                <div className="flex gap-2 text-xs">
                  <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className={getLogTypeColor(log.type)}>[{log.type.toUpperCase()}]</span>
                </div>
                
                {/* Mensaje principal */}
                <div className="ml-6 text-white my-1">{log.message}</div>
                
                {/* Detalles si existen */}
                {log.details && (
                  <div className="ml-10 text-gray-400 mt-1">
                    {log.details.map((detail, i) => (
                      <div key={i} className="my-0.5">{detail}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Cursor parpadeante al final */}
            {isTyping && currentLogIndex < logs.length && (
              <div className="flex items-center text-gray-400">
                <span>$ </span>
                <BlinkingCursor color="#FF4F00" />
              </div>
            )}

            {/* Prompt final cuando todos los logs se han mostrado */}
            {currentLogIndex >= logs.length && (
              <div className="text-green-400 flex items-center">
                <span>$ _</span>
                <BlinkingCursor color="#FF4F00" />
              </div>
            )}
          </div>
          
          {/* Barra de estado */}
          <div className="bg-gray-900 px-4 py-1 text-xs font-mono flex justify-between">
            <span className="text-green-400">Status: Online</span>
            <span className="text-gray-400">{Math.min(currentLogIndex, logs.length)}/{logs.length} logs</span>
            <span className="text-[#FF4F00]">{isInView ? 'ACTIVO' : 'INACTIVO'}</span>
          </div>
        </motion.div>
      </section>
    </Element>
  );
};

export default AboutSection;
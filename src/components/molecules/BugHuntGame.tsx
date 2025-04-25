import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BugPosition {
  x: number;
  y: number;
  found: boolean;
  rotation: number;
}

const BugHuntGame = () => {
  const [bugs, setBugs] = useState<BugPosition[]>([]);
  const [bugsFound, setBugsFound] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const totalBugs = 5;

  useEffect(() => {
    const generateBugs = () => {
      const newBugs: BugPosition[] = [];
      for (let i = 0; i < totalBugs; i++) {
        newBugs.push({
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          found: false,
          rotation: Math.random() * 360,
        });
      }
      setBugs(newBugs);
    };

    generateBugs();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleBugClick = (index: number) => {
    if (!bugs[index].found) {
      const newBugs = [...bugs];
      newBugs[index].found = true;
      setBugs(newBugs);
      const newBugsFound = bugsFound + 1;
      setBugsFound(newBugsFound);

      if (newBugsFound === totalBugs) {
        setShowVictory(true);
        setTimeout(() => setShowVictory(false), 5000);
      }
    }
  };

  const calculateNewPosition = (bugPos: BugPosition) => {
    const distance = Math.hypot(bugPos.x - mousePosition.x, bugPos.y - mousePosition.y);
    const escapeRadius = 20; // Radio de escape en porcentaje de la pantalla
    
    if (distance < escapeRadius && !bugPos.found) {
      const angle = Math.atan2(bugPos.y - mousePosition.y, bugPos.x - mousePosition.x);
      const escapeSpeed = (escapeRadius - distance) / escapeRadius * 2;
      
      let newX = bugPos.x + Math.cos(angle) * escapeSpeed;
      let newY = bugPos.y + Math.sin(angle) * escapeSpeed;
      
      // Mantener los bugs dentro de los límites
      newX = Math.min(Math.max(newX, 5), 95);
      newY = Math.min(Math.max(newY, 5), 95);
      
      return { x: newX, y: newY };
    }
    
    return { x: bugPos.x, y: bugPos.y };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBugs(prevBugs => 
        prevBugs.map(bug => {
          if (bug.found) return bug;
          const newPos = calculateNewPosition(bug);
          return {
            ...bug,
            x: newPos.x,
            y: newPos.y,
            rotation: Math.atan2(newPos.y - bug.y, newPos.x - bug.x) * (180 / Math.PI),
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20"
      onMouseMove={handleMouseMove}
    >
      {bugs.map((bug, index) => (
        !bug.found && (
          <motion.button
            key={index}
            className="absolute w-8 h-8 text-[#FF4F00] pointer-events-auto cursor-pointer"
            style={{
              left: `${bug.x}%`,
              top: `${bug.y}%`,
              transform: `rotate(${bug.rotation}deg)`,
            }}
            onClick={() => handleBugClick(index)}
            whileHover={{ scale: 1.2 }}
            animate={{
              x: `${bug.x}%`,
              y: `${bug.y}%`,
              rotate: bug.rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 13.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM9.5 13.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
              <path d="M21.61 8.49c-.45-1.35-1.56-2.44-2.91-2.89-.49-.16-1.01-.25-1.55-.25h-2.8c-.14-.68-.41-1.31-.78-1.87-.57-.87-1.42-1.54-2.42-1.89L9.76 1.2c-.16-.05-.33.04-.37.2L8.95 3c-.05.19.07.39.26.43l1.39.37c.62.21 1.15.66 1.45 1.24.3.58.4 1.25.27 1.9l-.07.31h-1.66c-.54 0-1.06.09-1.55.25-1.35.45-2.46 1.54-2.91 2.89-.45 1.35-.4 2.83.14 4.13.41.98 1.13 1.79 2.05 2.33.8.47 1.72.72 2.66.72h6c.94 0 1.86-.25 2.66-.72.92-.54 1.64-1.35 2.05-2.33.53-1.3.58-2.78.13-4.13zm-2.33 3.67c-.27.65-.76 1.18-1.37 1.52-.54.31-1.15.48-1.77.48h-6c-.62 0-1.23-.17-1.77-.48-.61-.34-1.1-.87-1.37-1.52-.48-1.13-.41-2.42.18-3.49.45-.82 1.17-1.43 2.05-1.7.38-.12.78-.18 1.18-.18h6.34c.4 0 .8.06 1.18.18.88.27 1.6.88 2.05 1.7.59 1.07.66 2.36.18 3.49z"/>
            </svg>
          </motion.button>
        )
      ))}

      <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full">
        Bugs atrapados: {bugsFound}/{totalBugs}
      </div>

      <AnimatePresence>
        {showVictory && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-[#FF4F00] to-purple-600 text-white py-6 flex flex-col items-center justify-center space-y-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold"
            >
              ¡LOGRO DESBLOQUEADO! 🏆
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl"
            >
              ¡Has encontrado todos los bugs! +100 XP
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BugHuntGame;
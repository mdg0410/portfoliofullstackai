import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ConsoleInterface from '../components/organisms/ConsoleInterface';
import { RootState } from '../store';

const Home = () => {
  const { mode } = useSelector((state: RootState) => state.theme);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        <header className="mb-8">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-mono text-console-light"
          >
            Richard Steven Levoyer Chavez
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-mono text-console-gray"
          >
            Full Stack Dev & AI Explorer
          </motion.p>
        </header>
        
        <main className="flex-grow relative">
          <ConsoleInterface />
        </main>
      </div>
    </motion.div>
  );
};

export default Home;
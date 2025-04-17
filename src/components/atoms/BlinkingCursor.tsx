import { motion } from 'framer-motion';

const BlinkingCursor = () => {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="inline-block w-2 h-5 bg-console-light"
    />
  );
};

export default BlinkingCursor;
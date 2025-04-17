import React from 'react';

interface BlinkingCursorProps {
  color?: string;
  height?: string;
  width?: string;
}

/**
 * Componente que simula un cursor de terminal parpadeante para usar con efectos de máquina de escribir
 */
const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ 
  color = '#FF4F00',
  height = '1.2em', 
  width = '2px'
}) => {
  return (
    <span 
      className="inline-block animate-blink ml-1" 
      style={{ 
        backgroundColor: color,
        height: height,
        width: width,
        verticalAlign: 'middle'
      }}
    />
  );
};

export default BlinkingCursor;
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Home from '../pages/Home';
import AIChat from '../components/molecules/AIChat';

// Layout principal que envuelve todas las páginas
const AppLayout = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <div className="app-container bg-[#0D0D0D] min-h-screen text-white">
      <Outlet />
    </div>
  );
};

// Componente de la página de chat independiente
const ChatPage = () => {
  return (
    <div className="w-full h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="w-full max-w-2xl h-[90vh] border-2 border-[#FF4F00] relative">
        <AIChat isOpen={true} onClose={() => window.location.href = '/'} />
      </div>
    </div>
  );
};

// Configuración de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: '*',
        element: (
          <div className="h-screen flex items-center justify-center flex-col gap-8">
            <h1 className="text-4xl font-['Orbitron'] text-[#FF4F00]">404 - NOT FOUND</h1>
            <div className="flex gap-4">
              <a 
                href="/" 
                className="px-6 py-3 bg-[#FF4F00] text-white font-['Orbitron'] text-lg border-2 border-[#FF4F00] transition-all hover:bg-transparent hover:text-[#FF4F00]"
              >
                INICIO
              </a>
              <a 
                href="/chat" 
                className="px-6 py-3 bg-transparent text-[#FF4F00] font-['Orbitron'] text-lg border-2 border-[#FF4F00] transition-all hover:bg-[#FF4F00] hover:text-white"
              >
                CHAT
              </a>
            </div>
          </div>
        )
      }
    ]
  }
]);

// Componente principal para renderizar el router
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
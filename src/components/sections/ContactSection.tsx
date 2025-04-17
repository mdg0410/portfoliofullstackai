import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Element } from 'react-scroll';

// Definición de tipos para el formulario
interface FormValues {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}

// Estado del envío del formulario
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Estados para el formulario
  const [values, setValues] = useState<FormValues>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  
  // Función para validar el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!values.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!values.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    if (!values.asunto.trim()) {
      newErrors.asunto = 'El asunto es obligatorio';
    }
    
    if (!values.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (values.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  // Manejar enfoque en campos
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };
  
  // Manejar pérdida de enfoque
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmissionState('submitting');
    
    try {
      // Simulación de envío (reemplazar con tu lógica de API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos un envío exitoso
      setSubmissionState('success');
      setValues({ nombre: '', email: '', asunto: '', mensaje: '' });
      setTouched({});
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    } catch (error) {
      setSubmissionState('error');
      
      // Resetear el estado de error después de 5 segundos
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  };
  
  return (
    <Element name="contact">
      <section 
        id="contact"
        ref={sectionRef}
        className="min-h-screen w-full bg-[#0D0D0D] py-20 px-4 relative overflow-hidden"
      >
        {/* Líneas decorativas brutalistas */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0D0D0D] border-b-2 border-[#FF4F00]"></div>
        <div className="absolute top-6 left-4 font-mono text-xs text-[#FF4F00]">/contact</div>
        <div className="absolute top-6 right-4 font-mono text-xs text-[#FF4F00]">section.05</div>
        
        {/* Header de la sección */}
        <motion.div 
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-['Orbitron'] text-white">
            <span className="text-[#FF4F00]">&lt;</span> 
            CONTACTO 
            <span className="text-[#FF4F00]"> /&gt;</span>
          </h2>
          <p className="mt-2 text-gray-400 font-mono max-w-2xl">
            // ¿Listo para colaborar? Completa el formulario y me pondré en contacto contigo pronto
          </p>
        </motion.div>
        
        {/* Contenedor principal */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Formulario de contacto */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#0a0a0a] border-2 border-gray-800 rounded-sm overflow-hidden">
              {/* Barra de título del formulario */}
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-gray-400">contact_form.jsx</div>
                <div className="text-xs font-mono text-gray-500">({submissionState})</div>
              </div>
              
              {/* Contenido del formulario */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Campo de nombre */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-300 font-mono text-sm" htmlFor="nombre">
                        <span className="text-[#FF4F00]">const</span> nombre = 
                      </label>
                      <div className="relative flex-1">
                        <motion.div
                          className="absolute -left-1 -top-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#FF4F00] rounded-none pointer-events-none"
                          animate={
                            focusedField === 'nombre' 
                              ? { opacity: 1, scale: 1.02 } 
                              : { opacity: 0, scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        />
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className="bg-gray-800 text-white px-4 py-2 w-full outline-none font-mono"
                          placeholder="'Tu nombre'"
                        />
                      </div>
                    </div>
                    {touched.nombre && errors.nombre && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-mono mt-1"
                      >
                        // {errors.nombre}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Campo de email */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-300 font-mono text-sm" htmlFor="email">
                        <span className="text-[#FF4F00]">const</span> email = 
                      </label>
                      <div className="relative flex-1">
                        <motion.div
                          className="absolute -left-1 -top-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#FF4F00] rounded-none pointer-events-none"
                          animate={
                            focusedField === 'email' 
                              ? { opacity: 1, scale: 1.02 } 
                              : { opacity: 0, scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className="bg-gray-800 text-white px-4 py-2 w-full outline-none font-mono"
                          placeholder="'tu@email.com'"
                        />
                      </div>
                    </div>
                    {touched.email && errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-mono mt-1"
                      >
                        // {errors.email}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Campo de asunto */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-300 font-mono text-sm" htmlFor="asunto">
                        <span className="text-[#FF4F00]">const</span> asunto = 
                      </label>
                      <div className="relative flex-1">
                        <motion.div
                          className="absolute -left-1 -top-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#FF4F00] rounded-none pointer-events-none"
                          animate={
                            focusedField === 'asunto' 
                              ? { opacity: 1, scale: 1.02 } 
                              : { opacity: 0, scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        />
                        <input
                          type="text"
                          id="asunto"
                          name="asunto"
                          value={values.asunto}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className="bg-gray-800 text-white px-4 py-2 w-full outline-none font-mono"
                          placeholder="'Asunto del mensaje'"
                        />
                      </div>
                    </div>
                    {touched.asunto && errors.asunto && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-mono mt-1"
                      >
                        // {errors.asunto}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Campo de mensaje */}
                  <div className="mb-6">
                    <div className="mb-2">
                      <label className="text-gray-300 font-mono text-sm block mb-2" htmlFor="mensaje">
                        <span className="text-[#FF4F00]">const</span> mensaje = {`{`}
                      </label>
                      <div className="relative">
                        <motion.div
                          className="absolute -left-1 -top-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#FF4F00] rounded-none pointer-events-none"
                          animate={
                            focusedField === 'mensaje' 
                              ? { opacity: 1, scale: 1.02 } 
                              : { opacity: 0, scale: 1 }
                          }
                          transition={{ duration: 0.2 }}
                        />
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          value={values.mensaje}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          rows={5}
                          className="bg-gray-800 text-white px-4 py-2 w-full outline-none font-mono resize-none"
                          placeholder="Tu mensaje aquí..."
                        />
                      </div>
                      <div className="text-gray-300 font-mono text-sm">
                        {`}`}
                      </div>
                    </div>
                    {touched.mensaje && errors.mensaje && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-mono mt-1"
                      >
                        // {errors.mensaje}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Botón de envío */}
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={submissionState === 'submitting'}
                      className={`px-6 py-3 bg-[#FF4F00] text-white font-['Orbitron'] border-2 border-[#FF4F00] hover:bg-transparent hover:text-[#FF4F00] transition-colors ${submissionState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                      whileHover={{ scale: submissionState !== 'submitting' ? 1.05 : 1 }}
                      whileTap={{ scale: submissionState !== 'submitting' ? 0.95 : 1 }}
                    >
                      {submissionState === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          ENVIANDO...
                        </span>
                      ) : 'ENVIAR MENSAJE'}
                    </motion.button>
                  </div>
                  
                  {/* Notificaciones de estado */}
                  <AnimatePresence>
                    {submissionState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-500 text-green-400 font-mono"
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          ¡Mensaje enviado correctamente! Te responderé lo antes posible.
                        </div>
                      </motion.div>
                    )}
                    
                    {submissionState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 text-red-400 font-mono"
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
          
          {/* Información de contacto */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#0a0a0a] border-2 border-gray-800 rounded-sm h-full p-6">
              <h3 className="text-xl font-['Orbitron'] text-white mb-6">
                <span className="text-[#FF4F00]">#</span> Información de contacto
              </h3>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4F00]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Email:</p>
                    <a href="mailto:steven@levoyer.dev" className="text-white hover:text-[#FF4F00] transition-colors">
                      steven@levoyer.dev
                    </a>
                  </div>
                </div>
                
                {/* Ubicación */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4F00]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Ubicación:</p>
                    <p className="text-white">
                      Quito, Ecuador
                    </p>
                  </div>
                </div>
                
                {/* Redes sociales */}
                <div>
                  <p className="text-sm text-gray-500 font-mono mb-3">Redes sociales:</p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/stevenlevoyer" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center text-white hover:bg-[#FF4F00] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/stevenlevoyer" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center text-white hover:bg-[#FF4F00] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://twitter.com/stevenlevoyer" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-gray-800 flex items-center justify-center text-white hover:bg-[#FF4F00] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Disponibilidad */}
                <div className="border-t border-gray-800 pt-6">
                  <p className="text-sm text-gray-500 font-mono mb-2">Disponibilidad:</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <p className="text-green-500 font-mono">
                      Disponible para proyectos
                    </p>
                  </div>
                </div>
                
                {/* Horario */}
                <div className="pt-2">
                  <p className="text-sm text-gray-500 font-mono mb-2">Horario de trabajo:</p>
                  <p className="font-mono text-white">
                    Lun - Vie: <span className="text-[#FF4F00]">09:00 - 18:00</span> (GMT-5)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-20 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Richard Steven Levoyer. Todos los derechos reservados.
          </p>
        </div>
      </section>
    </Element>
  );
};

export default ContactSection;
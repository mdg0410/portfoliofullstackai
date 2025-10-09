// Utilidad para detectar el tipo de dispositivo y redireccionar a WhatsApp
export interface WhatsAppRedirectOptions {
  phoneNumber: string;
  message?: string;
}

export const detectDevice = (): 'desktop' | 'mobile' => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  return isMobile ? 'mobile' : 'desktop';
};

export const redirectToWhatsApp = ({ phoneNumber, message = '' }: WhatsAppRedirectOptions): void => {
  const device = detectDevice();
  const encodedMessage = encodeURIComponent(message);
  
  // Limpiar el número de teléfono (remover espacios, guiones, etc.)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  let whatsappUrl: string;
  
  if (device === 'mobile') {
    // Para móviles: abre directamente la app de WhatsApp
    whatsappUrl = `whatsapp://send?phone=${cleanPhone}&text=${encodedMessage}`;
  } else {
    // Para desktop: usa WhatsApp Web
    whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
  }
  
  // Intentar abrir WhatsApp
  try {
    window.open(whatsappUrl, '_blank');
  } catch (error) {
    console.error('Error al abrir WhatsApp:', error);
    // Fallback: mostrar número de teléfono
    alert(`No se pudo abrir WhatsApp automáticamente. Puedes contactarme en: ${phoneNumber}`);
  }
};

// Función específica para contactar al propietario del portafolio
export const contactOwnerWhatsApp = (message?: string): void => {
  // Aquí debes poner tu número real de WhatsApp (con código de país)
  const ownerPhone = '+593962889699'; // Reemplaza con tu número real
  
  const defaultMessage = message || 
    '¡Hola! Vi tu portafolio y me gustaría contactarte para discutir oportunidades laborales.';
  
  redirectToWhatsApp({
    phoneNumber: ownerPhone,
    message: defaultMessage
  });
};
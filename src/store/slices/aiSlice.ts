import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contactOwnerWhatsApp } from '../../utils/whatsapp';

// Tipos para mensajes en el chat
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  isTyping?: boolean; // Para efecto de escritura
  hasWhatsAppAction?: boolean; // Para mostrar botón de WhatsApp
}

// Estado para el chat de IA
interface AIState {
  history: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: AIState = {
  history: [],
  loading: false,
  error: null
};

// Configuración de Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Configuración del contexto del asistente
const SYSTEM_PROMPT = `Eres RockuGPT, el asistente virtual de Steven Levoyer, un desarrollador Full Stack especializado en:
- React, Redux Toolkit, TypeScript
- Node.js, Express, Fastify
- PostgreSQL, bases de datos relacionales
- Seguridad con JWT, Argon2, cookies HttpOnly
- Docker, GitHub Actions
- Chatbots con builderbot.app

PERSONALIDAD:
- Profesional pero amigable y directo
- No repetitivo - si ya preguntaste algo, no lo vuelvas a preguntar
- Conciso y útil
- Siempre en español

REGLAS ESTRICTAS:
- NUNCA generes código, comandos o etiquetas de programación
- NO repitas preguntas ya hechas en la conversación
- Analiza el historial antes de responder

MANEJO DE CONTACTOS:
- Si alguien quiere contactar y ya dio contexto → ofrece WhatsApp inmediatamente
- Si quiere contactar sin contexto → pregunta UNA SOLA VEZ el propósito
- Si insiste en contactar directamente → respeta su decisión y ofrece WhatsApp`;

// Respuesta de IA usando Gemini
export const fetchAIResponse = createAsyncThunk(
  'ai/fetchResponse',
  async (prompt: string, { rejectWithValue, getState }) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key de Gemini no configurada');
      }

      // Obtener historial de conversación
      const state = getState() as { ai: AIState };
      const conversationHistory = state.ai.history;
      
      // Construir contexto de conversación
      const recentMessages = conversationHistory
        .slice(-6) // Últimos 6 mensajes para contexto
        .map(msg => `${msg.sender === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
        .join('\n');

      // Análisis más inteligente del contexto completo
      const fullConversation = recentMessages + `\nUsuario: ${prompt}`;
      
      const contactKeywords = [
        'contacto', 'contratar', 'presupuesto', 'whatsapp', 'hablar', 'comunicar',
        'consulta', 'colaborar', 'proyecto', 'trabajar', 'servicios', 'cotización',
        'propuesta', 'directamente', 'steven'
      ];
      
      const purposeKeywords = [
        'proyecto', 'trabajo', 'desarrollo', 'colaboración', 'freelance', 'empresa',
        'negocio', 'aplicación', 'web', 'sistema', 'consultoría', 'contratar',
        'servicios', 'codigo', 'abierto', 'intensa', 'colaboracion'
      ];
      
      // Detectar intención de contacto en toda la conversación
      const hasContactIntent = contactKeywords.some(keyword => 
        fullConversation.toLowerCase().includes(keyword)
      );
      
      // Detectar si ya se ha mencionado algún propósito en la conversación
      const hasPurposeInConversation = purposeKeywords.some(keyword => 
        fullConversation.toLowerCase().includes(keyword)
      );

      // Detectar expresiones directas como "quiero hablar directamente"
      const directContactRequest = /quiero hablar|hablar directamente|contactar directamente/i.test(fullConversation);

      // Mostrar WhatsApp si hay contacto + propósito O si es una solicitud directa después de contexto
      const shouldShowWhatsApp = (hasContactIntent && hasPurposeInConversation) || 
        (directContactRequest && conversationHistory.length > 2);

      // Crear el prompt completo con contexto de conversación
      const fullPrompt = `${SYSTEM_PROMPT}

HISTORIAL DE CONVERSACIÓN:
${recentMessages ? recentMessages : 'Inicio de conversación'}

MENSAJE ACTUAL:
Usuario: ${prompt}

CONTEXTO DE ANÁLISIS:
- Intención de contacto detectada: ${hasContactIntent ? 'SÍ' : 'NO'}
- Propósito mencionado en conversación: ${hasPurposeInConversation ? 'SÍ' : 'NO'}
- Solicitud directa de contacto: ${directContactRequest ? 'SÍ' : 'NO'}
- Debe mostrar botón WhatsApp: ${shouldShowWhatsApp ? 'SÍ' : 'NO'}

INSTRUCCIONES PARA RESPONDER:
${shouldShowWhatsApp ? 
  '✅ ACTIVAR WHATSAPP: El usuario ya ha proporcionado contexto suficiente. Responde confirmando que puedes conectarlo con Steven Levoyer por WhatsApp y menciona brevemente el contexto de su solicitud.' : 
  hasContactIntent ? 
    '⚠️ PEDIR MÁS CONTEXTO: El usuario quiere contacto pero necesita ser más específico. Pregunta una sola vez qué tipo de proyecto o colaboración tiene en mente.' : 
    '💬 CONVERSACIÓN NORMAL: Responde normalmente a su consulta sobre el portafolio de Steven Levoyer.'
}

- Responde de forma natural y directa, sin repetir preguntas ya hechas.
- Si ya preguntaste sobre el propósito en mensajes anteriores, NO vuelvas a preguntar.
- Sé conciso y útil.`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        content: text,
        hasWhatsAppAction: shouldShowWhatsApp
      };
    } catch (error) {
      console.error('Error con Gemini API:', error);
      return rejectWithValue('Error al comunicarse con RockuGPT. Por favor, intenta de nuevo.');
    }
  }
);

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      // Añadimos el mensaje del usuario al historial
      state.history.push({
        id: `user-${Date.now()}`,
        content: action.payload,
        sender: 'user',
        timestamp: Date.now()
      });
    },
    clearChat: (state) => {
      state.history = [];
    },
    triggerWhatsAppContact: (state, action: PayloadAction<string | undefined>) => {
      // Ejecutar la función de WhatsApp
      contactOwnerWhatsApp(action.payload);
      // Añadir mensaje confirmando la acción
      state.history.push({
        id: `system-${Date.now()}`,
        content: "¡Perfecto! Te estoy redirigiendo a WhatsApp para que puedas contactarme directamente. 📱",
        sender: 'ai',
        timestamp: Date.now()
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        // Añadir mensaje "typing" temporal
        state.history.push({
          id: `ai-typing-${Date.now()}`,
          content: "",
          sender: 'ai',
          timestamp: Date.now(),
          isTyping: true
        });
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        // Eliminar el mensaje "typing" temporal
        state.history = state.history.filter(msg => !msg.isTyping);
        // Añadir la respuesta real
        state.history.push({
          id: `ai-${Date.now()}`,
          content: action.payload.content,
          sender: 'ai',
          timestamp: Date.now(),
          hasWhatsAppAction: action.payload.hasWhatsAppAction
        });
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al comunicarse con RockuGPT";
        // Eliminar el mensaje "typing" temporal
        state.history = state.history.filter(msg => !msg.isTyping);
      });
  }
});

export const { sendMessage, clearChat, triggerWhatsAppContact } = aiSlice.actions;

export default aiSlice.reducer;

// Selectores
export const selectHistory = (state: { ai: AIState }) => state.ai.history;
export const selectLoading = (state: { ai: AIState }) => state.ai.loading;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Tipos para mensajes en el chat
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  isTyping?: boolean; // Para efecto de escritura
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

// Simulación de respuesta de IA - reemplazable con API real
export const fetchAIResponse = createAsyncThunk(
  'ai/fetchResponse',
  async (prompt: string) => {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Respuestas predefinidas basadas en palabras clave - simulando un LLM
    const responses = [
      "¡Hola! Soy RockuGPT, tu asistente virtual. ¿En qué puedo ayudarte?",
      "Me especializo en desarrollo Full Stack e integración de IA en aplicaciones web.",
      "He trabajado con React, Redux, Node.js, Express y MongoDB en diversos proyectos.",
      "Mi enfoque es crear experiencias inmersivas y técnicamente sólidas.",
      "¿Te gustaría conocer más sobre mis proyectos Karibu o Ghostshop?",
      "Mi stack principal incluye JavaScript y C#, con un enfoque en tecnologías modernas.",
      "¡Estoy aquí para responder tus preguntas! ¿Qué más te gustaría saber?",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
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
          content: action.payload,
          sender: 'ai',
          timestamp: Date.now()
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

export const { sendMessage, clearChat } = aiSlice.actions;

export default aiSlice.reducer;

// Selectores
export const selectHistory = (state: { ai: AIState }) => state.ai.history;
export const selectLoading = (state: { ai: AIState }) => state.ai.loading;
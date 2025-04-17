export interface PersonalInfo {
  nombre_completo: string;
  alias: string;
  rol_profesional: string;
  stack_actual: string[];
  lenguajes: string[];
  tecnologías_IA: string[];
  especializaciones: string[];
}

export interface Project {
  nombre: string;
  tipo: string;
  tecnologías: string[];
  características: string[];
}

export interface AppState {
  theme: 'light' | 'dark';
  currentSection: string;
  consoleHistory: string[];
}
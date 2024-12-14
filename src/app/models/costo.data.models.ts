// Interfaz básica para un registro de evolución de costos
export interface CostRecord {
  tipoAdministracion: string; // Tipo de administración (e.g., Adm. Directa, J.S.R., etc.)
  periodo: string;            // Periodo correspondiente (e.g., "2023 (Ene-Dic)")
  montoTotalMiles: number;    // Monto total en miles
  ordenMuestra: number;       // Orden para visualización
}

// Datos de evolución de costos agrupados
export interface CostEvolutionData {
  success: boolean;       // Indicador de éxito de la operación
  data: CostRecord[];     // Array de registros de costos
  periodo: string;        // Período general de los datos
  error?: string;         // Mensaje de error opcional
}

// Respuesta completa de evolución de costos
export interface CostEvolutionResponse {
  success: boolean;            // Indicador de éxito
  data: CostEvolutionData;     // Datos de la evolución de costos
  params: CostEvolutionParams; // Parámetros de consulta
  error?: string;              // Mensaje de error opcional
}

// Parámetros opcionales para filtrar evolución de costos
export interface CostEvolutionParams {
  ano?: number; // Año para filtrar (opcional)
}

// Respuesta genérica de la API con genéricos para adaptabilidad
export interface ApiResponse<T> {
  success: boolean; // Indicador de éxito
  data: T;          // Datos de respuesta
  message: string;  // Mensaje descriptivo
  error?: string;   // Detalles adicionales del error (opcional)
}

// Estructura de datos para comparativo CMM
export interface ComparativoCMM {
  codigoRegion: number;  // Código único de la región
  nombreRegion: string;  // Nombre de la región
  ano: number;           // Año del dato
  promedioCMM: number;   // Promedio del CMM para la región y año
}

// Respuesta con posibles errores
export interface ErrorResponse {
  success: false; // Indica que la operación no fue exitosa
  message: string; // Mensaje de error
  error?: string;  // Detalles adicionales del error (opcional)
}

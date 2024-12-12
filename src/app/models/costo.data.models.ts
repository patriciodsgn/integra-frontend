// Interfaz para agrupar los datos de costos
export interface CostEvolutionData {
    success: boolean;
    data: CostRecord[];         // Array de registros de costos
    periodo: string;              // Período general de los datos
    error?: string;  
}

// Interfaz para la respuesta completa del API
export interface CostEvolutionResponse {
    success: boolean;             // Indicador de éxito de la operación
    data: CostEvolutionData;      // Datos de la evolución de costos
    params: CostEvolutionParams;  // Parámetros usados en la consulta
    error?: string;               // Mensaje de error opcional
}

// Interfaz para el manejo de errores
export interface ErrorResponse {
    success: false;
    message: string;
    error?: string;               // Detalles adicionales del error en modo desarrollo
}

// Esta interfaz define la estructura básica de un registro de costo individual
export interface CostRecord {
    // El tipo de administración (ej: Adm. Directa, J.S.R., etc.)
    tipoAdministracion: string;
    
    // El período al que corresponden los datos (ej: 2023 (Ene-Dic))
    periodo: string;
    
    // El monto total en miles (número que puede tener decimales)
    montoTotalMiles: number;
    
    // El orden para mostrar en la visualización
    ordenMuestra: number;
}

// Interfaz para los parámetros que se pueden enviar en la consulta
export interface CostEvolutionParams {
    // Año para filtrar los datos (opcional)
    ano?: number;
}

// Interfaz genérica para respuestas API
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

// Interfaz específica para ComparativoCMM
export interface ComparativoCMM {
    id: number;
    descripcion: string;
    valor: number;
}

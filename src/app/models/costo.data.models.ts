// Interfaz para agrupar los datos de costos
export interface CostEvolutionData {
    costos: CostRecord[];         // Array de registros de costos
    periodo: string;              // Período general de los datos
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

// Interfaz para agrupar los datos de costos y su información relacionada
export interface CostEvolutionData {
    // Array de registros de costos individuales
    costos: CostRecord[];
    
    // Período general que abarca todos los datos
    periodo: string;
}

// Interfaz para los parámetros que se pueden enviar en la consulta
export interface CostEvolutionParams {
    // Año para filtrar los datos (opcional)
    ano?: number;
}

// Interfaz para la respuesta completa que enviará el API
export interface CostEvolutionResponse {
    // Indica si la operación fue exitosa
    success: boolean;
    
    // Contiene los datos de la evolución de costos
    data: CostEvolutionData;
    
    // Los parámetros que se usaron en la consulta
    params: CostEvolutionParams;
    
    // Mensaje de error opcional en caso de que algo falle
    error?: string;
}

// Interfaz específica para cuando ocurre un error
export interface ErrorResponse {
    // Siempre es false en caso de error
    success: false;
    
    // Mensaje descriptivo del error
    message: string;
    
    // Detalles técnicos adicionales (solo en desarrollo)
    error?: string;
}
// Modelo para las direcciones
export interface Direccion {
    CodigoDireccion: number | null; // Código de la Dirección (puede ser nulo)
    TipoDireccion: string | null;  // Tipo de la Dirección (puede ser nulo)
    NombreDireccion: string;       // Nombre de la Dirección
}

// Modelo para los rubros
export interface Rubro {
    Rubro: string;      // Nombre del Rubro
    SubRubro: string;   // Nombre del SubRubro
}

// Modelo para los subrubros
export interface SubRubro {
    SubRubro: string;   // Subrubro filtrado por Rubro
}

// Modelo genérico para la validación de parámetros opcionales
export interface ParametrosOpcionales {
    CodigoDireccion?: number; // Opcional: Código de la Dirección
    TipoDireccion?: string;   // Opcional: Tipo de Dirección
}

// Modelo para validar Rubro (usado en el middleware `validateRubro`)
export interface ParametrosRubro {
    Rubro: string; // Rubro obligatorio
}

// Modelo de respuesta estándar
export interface RespuestaAPI<T> {
    success: boolean;       // Indicador de éxito o error
    message?: string;       // Mensaje adicional
    data?: T;               // Datos devueltos por el servidor
    count?: number;         // Número de registros devueltos
}

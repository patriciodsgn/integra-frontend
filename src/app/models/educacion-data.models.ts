// Interfaces base
export interface Necesidad {
    descripcionNEE: string;
    categoriaNEE: string;
    descripcionRegion: string;
    cantidad: number;
}

export interface NecesidadPorComuna {
    descripcionNEE: string;
    categoriaNEE: string;
    descripcionRegion: string;
    comuna: string;
    cantidad: number;
}

export interface PorcentajePermanente {
    descripcionRegion: string;
    comuna: string;
    porcentajePermanente: number;
    cantidadPermanente: number;
    cantidadTotal: number;
}

// Interface para la respuesta de la API
export interface ApiResponse<T> {
    success: boolean;
    data: T[];
    count: number;
}

// Interfaces específicas para las respuestas
export interface NecesidadesResponse extends ApiResponse<Necesidad> {
    summary: {
        cantidadTotal: number;
        necesidadesPorCategoria: {
            [key: string]: number;
        };
    };
}

export interface NecesidadesPorComunaResponse extends ApiResponse<NecesidadPorComuna> {}

export interface PorcentajePermanenteResponse extends ApiResponse<PorcentajePermanente> {}

// Interface para el resumen de necesidades (para las tarjetas)
export interface ResumenNecesidades {
    permanente: number;
    transitoria: number;
    rezago: number;
}

// Interface para el dashboard completo
export interface DashboardData {
    resumen: ResumenNecesidades;
    necesidades: NecesidadesResponse;
    necesidadesPorComuna: NecesidadesPorComunaResponse;
    porcentajePermanente: PorcentajePermanenteResponse;
}

// Interface para parámetros
export interface EducacionParams {
    ano: number;
    codigoRegion?: number;
}
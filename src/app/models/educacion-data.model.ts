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
// Interface para el gráfico de NEE
export interface GraficoNEE {
    categoria: string;
    porcentaje: number;
    cantidad: number;
}

// Interface para la respuesta del endpoint gráfico de NEE
export interface GraficoNEEResponse extends ApiResponse<GraficoNEE> {}

// Interface para el porcentaje de rezago
export interface PorcentajeRezago {
    descripcionRegion: string;
    porcentajeRezago: number;
    cantidadRezago: number;
    cantidadTotal: number;
}

// Interface para la respuesta del endpoint porcentaje de rezago
export interface PorcentajeRezagoResponse extends ApiResponse<PorcentajeRezago> {}

export interface PromedioSatisfaccionResponse {
    success: boolean;
    data: {
        promedioSatisfaccion: number;
    };
}

// Interface para la satisfacción por región
export interface SatisfaccionGeografica {
    region: string;
    promedioSatisfaccion: number;
    totalJardines: number;
}

// Interface para el resumen de satisfacción nacional
export interface ResumenSatisfaccion {
    promedioNacional: number;
}

// Interface para la respuesta del endpoint de satisfacción geográfica
export interface SatisfaccionGeograficaResponse extends ApiResponse<SatisfaccionGeografica> {
    summary: ResumenSatisfaccion;
}

// Actualizar DashboardData para incluir satisfacción geográfica
export interface DashboardData {
    resumen: ResumenNecesidades;
    necesidades: NecesidadesResponse;
    necesidadesPorComuna: NecesidadesPorComunaResponse;
    porcentajePermanente: PorcentajePermanenteResponse;
    satisfaccionGeografica: SatisfaccionGeograficaResponse;
}

// Interface for the cantidadTotal response
export interface CantidadTotalResponse {
    success: boolean;
    data: {
        cantidadTotal: number;
    };
}

// Extender EducacionParams para casos donde no se requiere región
export interface EducacionParamsOptionalRegion {
    ano: number;
    codigoRegion?: never;
}

// Union type para parámetros que pueden o no requerir región
export type EducacionParamsType = EducacionParams | EducacionParamsOptionalRegion;
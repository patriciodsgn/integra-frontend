// Interfaces existentes
export interface ConteoJardines {
    region: string;
    totalJardines: number;
}

export interface ConteoResponse {
    success: boolean;
    data: ConteoJardines[];
    count: number;
    summary: {
        totalGeneral: number;
    };
    params: {
        codigoRegion: number;
    };
}

export interface TotalNinosResponse {
    success: boolean;
    data: {
        totalNinosOriginarios: number;
    };
    params: {
        ano: number;
        codigoRegion: number;
    };
}

export interface NacionalidadDetalle {
    nacionalidad: string;
    totalNinos: number;
}

export interface TotalMigrantesResponse {
    success: boolean;
    data: {
        totales: {
            totalNinosMigrantes: number;
            totalJardinesConMigrantes: number;
        };
        detallePorNacionalidad: NacionalidadDetalle[];
    };
    count: number;
    params: {
        ano: number;
        codigoRegion: number;
    };
}

export interface TotalJardinesROResponse {
    success: boolean;
    data: {
        totalJardinesConRO: number;
        totalJardinesROIntegra: number;
        totalJardinesROSdEP: number;
        totalJardines: number;
    };
    params: {
        anoRO: number;
        codigoRegion: number;
    };
}

// Nueva interface para sello verde
export interface TotalJardinesSelloVerdeResponse {
    success: boolean;
    data: {
        totalJardinesVigentes: number;
        totalJardinesCerrados: number;
        totalJardines: number;
    };
    params: {
        anoSV: number;
        codigoRegion: number;
    };
}

// Interface base para parámetros comunes (opcional, para reutilización)
export interface BaseParams {
    codigoRegion?: number;
}

// Interface para parámetros con año (opcional, para reutilización)
export interface ParamsConAno extends BaseParams {
    ano: number;
}

export interface FrecuenciaPueblosOriginariosItem {
    region: number;
    nombreRegion: string;
    provincia: string;
    comuna: string;
    frecuencia: number;
}

export interface FrecuenciaPueblosOriginariosResponse {
    success: boolean;
    data: FrecuenciaPueblosOriginariosItem[];
    count: number;
    summary: {
        totalFrecuencia: number;
    };
    params: {
        codigoRegion: number;
        codigoJardin: number;
        ano: number;
    };
}

export interface EstadisticasROItem {
    tipoEstablecimiento: string;
    totalJardines: number;
    conReconocimiento: number;
    porcentaje: number;
}

export interface DetalleJardinRO {
    region: string;
    codigoJardin: number;
    nombreJardin: string;
    tipoEstablecimiento: string;
    comuna: string;
    provincia: string;
    estadoRO: string;
    fechaRO: Date;
    tienePlacaROIntegra: string;
    tienePlacaSdEP: string;
}

export interface EstadisticasROResponse {
    success: boolean;
    data: {
        estadisticas: EstadisticasROItem[];
        detalleJardines: DetalleJardinRO[];
    };
    params: {
        anoRO: number;
        codigoRegion: number;
        codigoJardin: number;
    };
}

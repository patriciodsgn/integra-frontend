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
export interface SelloVerdeGraficoResponse {
    success: boolean;
    data: {
        año: number;
        totalSellos: number;
        totalJardines: number;
        porcentaje: number;
    }[];
    params: {
        anoSV: number;
        codigoRegion: number;
        codigoJardin: number;
    };
    
}
// Agregar a dpgr-data.model.ts
export interface NacionalidadExtranjera {
    nacionalidad: string;
    total: number;
    porcentaje: number;
}

export interface ResumenExtranjeros {
    totalGeneral: number;
    totalExtranjeros: number;
    porcentajeExtranjeros: number;
}

export interface NacionalidadExranjeraResponse {
    success: boolean;
    data: {
        detalleNacionalidades: NacionalidadExtranjera[];
        resumen: ResumenExtranjeros;
    };
    params: {
        ano: number;
        codigoRegion: number;
        codigoJardin: number;
    };
}

// Service Interface
export interface PuebloOriginarioData {
    pueblo: string;
    total: number;
    porcentaje: number;
}

export interface PueblosOriginariosResponse {
    success: boolean;
    data: {
        detallePueblos: PuebloOriginarioData[];
        totalGeneral: number;
    };
    params: {
        ano: number;
        codigoRegion: number;
    };
}
// Interfaces para el servicio
export interface NacionalidadGeografica {
    [comuna: string]: {
        nombreRegion: string;
        direccionRegional: string;
        nacionalidades: {
            [nacionalidad: string]: number;
        };
    };
}

export interface NacionalidadGeograficaResponse {
    success: boolean;
    data: NacionalidadGeografica;
    params: {
        ano: number;
        codigoRegion: number;
    };


}


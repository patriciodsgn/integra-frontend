// Interfaces
export interface DetalleAccidente {
    nombreRegion: string;
    nombreJardin: string;
    comuna: string;
    totalAccidentes: number;
    ninosAfectados: number;
}

export interface ResumenAccidentes {
    TotalAccidentesNacional: number;
    TotalNinosAfectadosNacional: number;
}

export interface AccidentesResponse {
    success: boolean;
    data: {
        detalleAccidentes: DetalleAccidente[];
        resumen: ResumenAccidentes;
    };
    params: {
        ano: number;
        codigoRegion: number;
        codigoJardin: number;
    };
}

export interface DiagnosticoNutricionalResponse {
    success: boolean;
    data: {
        totalEvaluados: number;
        diagnosticos: {
            normal: number;
            obesidad: number;
            sobrepeso: number;
            deficit: number;
        }
    };
    params: {
        ano: number;
        codigoRegion: number;
        codigoJardin: number;
    };
}

export interface InformacionClaraResponse {
    success: boolean;
    data: {
        totalEncuestados: number;
        deAcuerdo: number;
        enDesacuerdo: number;
        porcentajes: {
            acuerdo: number;
            desacuerdo: number;
        };
    };
    params: {
        anio: number;
        codigoRegion: number;
    };
}
export interface InformacionGeograficaData {
    nombreRegion: string;
    totalEncuestados: number;
    deAcuerdo: number;
    enDesacuerdo: number;
}

export interface InformacionGeograficaResponse {
    success: boolean;
    data: InformacionGeograficaData[];
    params: {
        anio: number;
        codigoRegion: number;
    };
}

export interface ParticipacionGeograficaResponse {
    success: boolean;
    data: ParticipacionGeograficaData[];
    params: {
        anio: number | null;
        region: string | null;
    };
}

export interface ParticipacionGeograficaData {
    region: string;
    participacion: {
        si: number;
        no: number;
        total: number;
    };
    porcentajes: {
        si: number;
        no: number;
    };
}
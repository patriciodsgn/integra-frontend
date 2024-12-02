export interface Jardin {
    CodigoJardin: number;
    CodigoNivel: number;
    NombreJardin: string;
    TipoJornada: string | null;
    Comuna: string;
    Provincia: string | null;
    CodigoRegion: number;
    DireccionRegional: string | null;
    Correo: string;
}

export interface Nino {
    CodigoJardin: number;
    CodigoNivel: number;
    RUTNino: number;
    AnoProceso: number;
    DescripcionNacionalidad: string;
    NacionalidadPO: string;
    GrupoOriginariooIndigena: string;
}

export interface PuebloOriginarioStats {
    nombre: string;
    cantidad: number;
    porcentaje: number;
    color: string;
}

export interface RegionStats {
    comuna: string;
    stats: {[pueblo: string]: number};
}
export interface EstadisticasTotales {
    nombre: string;
    totalNinos: number;
    ninosOriginarios: number;
    porcentaje: number;
}
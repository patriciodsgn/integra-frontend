// models/presupuesto-data.model.ts

/**
 * Parámetros para las consultas de presupuesto
 */
export interface PresupuestoParams {
    ano: number;
    NombreDireccion?: string;
    Rubro?: string;
    SubRubro?: string;
    CodigoCentroGestor?: string;
    CodigoDireccion?: string;
}

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    count?: number;
    message?: string;
    error?: string;
}

/**
 * Datos para las tarjetas de presupuesto
 */
export interface DatosTarjeta {
    id: number;
    nombre: string;
    valor: number;
    fechaActualizacion?: Date;
    descripcion?: string;
    unidad?: string;
}

/**
 * Información de flujo y saldo
 */
export interface FlujoSaldo {
    montoTotal: number;
    saldoPendiente: number;
    fechaCorte?: Date;
    porcentajeEjecucion?: number;
}

/**
 * Información de gastos y saldos
 */
export interface GastosSaldo {
    gastosEjecutados: number;
    saldoPorGastar: number;
    periodo?: string;
    fechaActualizacion?: Date;
}

/**
 * Porcentajes de ejecución presupuestaria
 */
export interface PorcentajeEjecucion {
    porcentajeEjecutado: number;
    porcentajeSaldo: number;
    periodo?: string;
    totalPresupuesto?: number;
}

/**
 * Información de presupuesto comprometido vs ejecutado
 */
export interface PresupuestoComprometido {
    presupuestoComprometido: number;
    presupuestoEjecutado: number;
    diferencia?: number;
    porcentajeEjecucion?: number;
    periodo?: string;
}

/**
 * Detalle de presupuesto ejecutado por dirección
 */
export interface PresupuestoEjecutado {
    Direccion: string;
    PresupuestoVigente: string;
    MontoEjecutado: string;
    PorcentajeEjecucion?: string;
    FechaActualizacion?: string;
    CentroCosto?: string;
}

/**
 * Comparativa de presupuesto vs gastos
 */
export interface PresupuestoGastos {
    presupuesto: number;
    gastos: number;
    diferencia?: number;
    porcentajeGasto?: number;
    periodo?: string;
}

/**
 * Comparativa de presupuesto vigente vs ejecutado
 */
export interface PresupuestoVigente {
    presupuestoVigente: number;
    ejecutado: number;
    diferencia?: number;
    porcentajeEjecucion?: number;
    periodo?: string;
}

/**
 * Años disponibles para consulta
 */
export interface AnioEjecucion {
    anio: any;
    Ano: number;
    Activo?: boolean;
    Descripcion?: string;
}
export interface PresupuestoParams {
    ano: number;
    nombredireccion?: string;    // Cambiar de NombreDireccion
    rubro?: string;              // Cambiar de Rubro
    subrubro?: string;           // Cambiar de SubRubro
    codigocentrogestor?: string; // Cambiar de CodigoCentroGestor
    codigodireccion?: string;    // Cambiar de CodigoDireccion
}
// models/presupuesto-data.model.ts

export interface PresupuestoParams {
    ano: number;
    NombreDireccion?: string;
    Rubro?: string;
    SubRubro?: string;
    CodigoCentroGestor?: string;
    CodigoDireccion?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    count?: number;
    message?: string;
    error?: string;
}

export interface DatosTarjeta {
    // Define los campos según la respuesta de tu SP
    id: number;
    nombre: string;
    valor: number;
}

export interface FlujoSaldo {
    montoTotal: number;
    saldoPendiente: number;
}

export interface GastosSaldo {
    gastosEjecutados: number;
    saldoPorGastar: number;
}

export interface PorcentajeEjecucion {
    porcentajeEjecutado: number;
    porcentajeSaldo: number;
}

export interface PresupuestoComprometido {
    presupuestoComprometido: number;
    presupuestoEjecutado: number;
}

export interface PresupuestoEjecutado {
    Direccion: string;
    PresupuestoVigente: string;
    MontoEjecutado: string;
}

export interface PresupuestoGastos {
    presupuesto: number;
    gastos: number;
}

export interface PresupuestoVigente {
    presupuestoVigente: number;
    ejecutado: number;
}

export interface AnioEjecucion {
    Ano: number;
}
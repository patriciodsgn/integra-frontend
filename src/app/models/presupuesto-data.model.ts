// Modelo base para el presupuesto
export interface PresupuestoData {
    Ano: number; // Año obligatorio
    NombreDireccion?: string; // Nombre de la Dirección (opcional)
    Rubro?: string; // Rubro (opcional)
    SubRubro?: string; // SubRubro (opcional)
    CodigoCentroGestor?: string; // Código del Centro Gestor (opcional)
}

// Modelo para datos de las tarjetas
export interface DatosTarjetas {
    CodigoCentroGestor: string;
    NombreCentroGestor: string;
    Direccion: string;
    PresupuestoVigente: number;
    PresupuestoComprometido: number;
    GastosEjecutados: number;
    SaldoPorGastar: number;
    PorcentajeEjecucion: number;
}

// Modelo para flujo de saldo
export interface FlujoSaldo {
    SaldoPorEjecutar: number;
    TotalEjecutado: number;
    LimiteMaximo: number;
}

// Modelo para gastos ejecutados vs saldo por gastar
export interface GastosVsSaldo {
    Direccion: string;
    GastosEjecutados: number;
    SaldoPorGastar: number;
}

// Modelo para porcentaje de ejecución vs saldo
export interface PorcentajeEjecucionVsSaldo {
    Direccion: string;
    GastosEjecutados: number;
    SaldoPorGastar: number;
    PorcentajeEjecucion: number;
    PorcentajeSaldo: number;
}

// Modelo para presupuesto comprometido vs ejecutado
export interface PresupuestoComprometidoVsEjecutado {
    Direccion: string;
    PresupuestoComprometido: number;
    GastosEjecutados: number;
}

// Modelo para presupuesto vigente vs ejecutado
export interface PresupuestoVsEjecutado {
    Direccion: string;
    PresupuestoVigente: number;
    MontoEjecutado: number;
}

// Modelo para presupuesto vs gastos
export interface PresupuestoVsGastos {
    Direccion: string;
    PresupuestoVigente: number;
    GastosEjecutados: number;
}

// Modelo para obtener años de ejecución presupuestaria
export interface AnioEjecucion {
    Ano: number;
}

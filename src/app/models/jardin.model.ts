export interface JardinData {
    Cjor: string;       // Código Jardín
    Jor: string;        // Estado (NORMAL)
    Cniv: string;       // Código Nivel
    Niv: string;        // Nivel (MEDIO MENOR, MEDIO MAYOR)
    Gru: string;        // Grupo
    Cap: string;        // Capacidad
    "Tipo Nivel"?: string;  // Sala Cuna y Párvulo
}
    export interface MapDataItem {
        "hc-key": string;
        Region: string;
        CodReg: string;
        count: number;
        name: string;
        value: number;
    }
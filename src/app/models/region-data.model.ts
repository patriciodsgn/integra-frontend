export interface RegionData {
  regionId: number;
  regionName: string;
  kpiData: any[];
  chartData: any[];
}

export interface Region {
  nombreRegion: string;
  codigoRegion: number;
}

export interface RegionIntegra {
  codigoRegion: number;
  nombreRegion: string;
}

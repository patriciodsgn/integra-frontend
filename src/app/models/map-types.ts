export interface MapData {
  features: any[];
  type: string;
}

export interface SeriesDataItem {
  'hc-key': string;
  name: string;
  cantidadJardines: number;
  codigoComuna: string;
  value: number;
  color: string;
  properties: any;
}

export interface MapFeature {
  properties: {
    Comuna: string;
    CodCom: string;
    CantidadJardines: number;
    [key: string]: any;
  };
  type: string;
  geometry: any;
}

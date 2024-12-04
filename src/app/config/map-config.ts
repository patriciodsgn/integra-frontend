export interface RegionColor {
  [key: string]: string;
}

export interface RegionColors {
  [key: string]: RegionColor;
}

export const REGION_COLORS: RegionColors = {
  'Ñuble': {
    'Chillán': '#66B3CC',
    'Chillán Viejo': '#B8E6B8',
    'San Ignacio': '#E6B8B8',
    'El Carmen': '#006666',
    'Yungay': '#99CCFF',
    'Pemuco': '#B3E6FF',
    'Bulnes': '#F5E6D3',
    'Quillón': '#006699',
    'San Carlos': '#80D4E6',
    'Ñiquén': '#006E7F',
    'San Fabián': '#4D88FF',
    'Coihueco': '#D4D4F5',
    'San Nicolás': '#0077BE',
    'Ranquil': '#00A3CC',
    'Portezuelo': '#FFA500',
    'Coelemu': '#98FB98',
    'Treguaco': '#90EE90',
    'Cobquecura': '#006699',
    'Quirihue': '#B3E6FF',
    'Ninhue': '#663399',
    'Pinto': '#00CED1'
  },
  // ... Puedes copiar el resto de las regiones del código original
};

export const REGION_COORDINATES: { [key: string]: [number, number] } = {
  'Tarapacá': [-69.6689, -20.2133],
  'Antofagasta': [-70.4000, -23.6500],
  'Atacama': [-70.2500, -27.3667],
  'Coquimbo': [-71.2500, -29.9533],
  'Valparaíso': [-71.6167, -33.0472],
  'NorPoniente': [-80.77332956991316, -33.72414856743086]
};

export const REGION_NAMES: { [key: number]: string } = {
  1: 'Tarapacá',
  2: 'Antofagasta',
  3: 'Atacama',
  4: 'Coquimbo',
  5: 'Valparaíso',
  601: 'NorPoniente',
  602: 'Rural Norponiente',
  603: 'Sur Oriente',
  7: 'O\' higgins',
  8: 'Maule',
  9: 'Biobio',
  10: 'Araucania',
  11: 'Los Lagos',
  12: 'Aysén',
  13: 'Magallanes',
  14: 'Los Ríos',
  15: 'Arica y Parinacota',
  16: 'Ñuble'
};

export const GEOJSON_URLS: { [key: number]: string } = {
  1: '/assets/map/clta.geo.json',
  2: '/assets/map/clan.geo.json',
  3: '/assets/map/clat.geo.json',
  4: '/assets/map/clco.geo.json',
  5: '/assets/map/clvs.geo.json',
  601: '/assets/map/clrm_nor_oriente.geo.json',
  602: '/assets/map/clrm_ruralnor_poniente.geo.json',
  603: '/assets/map/clrm_sur_oriente.geo.json',
  7: '/assets/map/clog.geo.json',
  8: '/assets/map/clml.geo.json',
  9: '/assets/map/clbi.geo.json',
  10: '/assets/map/clar.geo.json',
  14: '/assets/map/cllr.geo.json',
  11: '/assets/map/clll.geo.json',
  12: '/assets/map/clay.geo.json',
  13: '/assets/map/clma.geo.json',
  15: '/assets/map/clap.geo.json',
  16: '/assets/map/clnu.geo.json'
};

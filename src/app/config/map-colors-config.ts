// Primero las interfaces
export interface RegionColor {
  [key: string]: string;
}

export interface RegionColors {
  [key: string]: RegionColor;
}

// Configuración general del mapa
export interface MapConfig {
  colors: {
    minColor: string;
    maxColor: string;
    hoverBorderColor: string;
  };
  zoom: {
    initial: number;
    sensitivity: number;
  };
  style: {
    fontFamily: string;
    fontSize: {
      title: string;
      subtitle: string;
    };
  };
}

// Configuración de colores por región
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
  'Arica y Parinacota': {
    'Arica': '#E6E6FA',
    'Putre': '#FFF3D4',
    'General Lagos': '#E8B89B',
    'Camarones': '#F5B7B1'
  },
  // ... [aquí van todas las demás regiones que tenías en el código original]
};

// Configuración general del mapa
export const MAP_CONFIG: MapConfig = {
  colors: {
    minColor: '#E6F3FF',
    maxColor: '#1565C0',
    hoverBorderColor: '#303030'
  },
  zoom: {
    initial: 1,
    sensitivity: 1.1
  },
  style: {
    fontFamily: 'Arial, sans-serif',
    fontSize: {
      title: '18px',
      subtitle: '12px'
    }
  }
};

// Opcionalmente, puedes agregar otras configuraciones relacionadas con el mapa
export const REGION_COORDINATES: { [key: string]: [number, number] } = {
  'Tarapacá': [-69.6689, -20.2133],
  'Antofagasta': [-70.4000, -23.6500],
  'Atacama': [-70.2500, -27.3667],
  'Coquimbo': [-71.2500, -29.9533],
  'Valparaíso': [-71.6167, -33.0472],
  'NorPoniente': [-80.77332956991316,-33.72414856743086]
};

export const REGION_NAMES: { [key: number]: string } = {
  1: 'Tarapacá',
  2: 'Antofagasta',
  3: 'Atacama',
  // ... resto de las regiones
};

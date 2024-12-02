// src/app/services/map-colors.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapColorsService {
    regionColors: { [key: string]: { [key: string]: string } } = {
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
        'Magallanes': {
          'Natales': '#6AACB8',
          'Punta Arenas': '#4A7B3F',
          'Porvenir': '#90EE90',
          'Torres del Paine': '#F4D03F'
        },
        'Aysén': {
          'Coyhaique': '#A5C7D3',
          'Lago Verde': '#2D5A4A',
          'Aysén': '#90EE90',
          'Cisnes': '#4A7B3F',
          'Guaitecas': '#F4D03F',
          'Río Ibañez': '#FFE4D6',
          'Cochrane': '#68A568',
          'O\'Higgins': '#1D4B2C'
        },
        'Los Lagos': {
          'Osorno': '#B2D8E6',
          'San Pablo': '#2D5A27',
          'Puyehue': '#B8E6B8',
          'Purranque': '#F4D03F',
          'Río Negro': '#F4D03F',
          'Puerto Montt': '#2D5A27',
          'Puerto Varas': '#1D4B2C',
          'Cochamó': '#D6EAF8',
          'Calbuco': '#90EE90',
          'Maullín': '#F4D03F',
          'Los Muermos': '#5F9EA0',
          'Fresia': '#4A7B4A',
          'Llanquihue': '#A8D5AA',
          'Frutillar': '#90EE90',
          'Castro': '#98FB98',
          'Ancud': '#B8E6B8',
          'Quemchi': '#2D5A27',
          'Dalcahue': '#4A7B4A',
          'Curaco de Vélez': '#90EE90',
          'Quinchao': '#98FB98',
          'Puqueldón': '#90EE90',
          'Chonchi': '#B8E6B8',
          'Queilén': '#98FB98',
          'Quellón': '#4A7B4A',
          'Hualaihué': '#F4D03F',
          'Futaleufú': '#2D5A27',
          'Palena': '#5F9EA0'
        },
        'Los Ríos': {
          'Valdivia': '#9FD4A1',
          'Corral': '#2D5A27',
          'Lanco': '#1D4B2C',
          'Los Lagos': '#FFE4D6',
          'Máfil': '#A8D5AA',
          'Mariquina': '#F4D03F',
          'Paillaco': '#5F9EA0',
          'Panguipulli': '#90EE90',
          'La Unión': '#98FB98',
          'Futrono': '#B8E6B8',
          'Lago Ranco': '#1D4B2C',
          'Río Bueno': '#8FBC8F'
        },
        'Araucania': {
          'Angol': '#90CE90',
          'Renaico': '#FFE4D6',
          'Collipulli': '#B8E6B8',
          'Lonquimay': '#2E8B57',
          'Curacautín': '#98FB98',
          'Ercilla': '#B8E6B8',
          'Victoria': '#C1E6C1',
          'Traiguén': '#B8E6B8',
          'Lumaco': '#0B5345',
          'Purén': '#F7DC6F',
          'Los Sauces': '#F7DC6F',
          'Temuco': '#A3E4D7',
          'Lautaro': '#FFE4D6',
          'Perquenco': '#90CE90',
          'Vilcún': '#5F9EA0',
          'Cunco': '#F7DC6F',
          'Melipeuco': '#98FB98',
          'Curarrehue': '#FFE4D6',
          'Pucón': '#FFE4D6',
          'Villarrica': '#AED6F1',
          'Freire': '#B8E6B8',
          'Pitrufquén': '#2E8B57',
          'Gorbea': '#F7DC6F',
          'Loncoche': '#B8E6B8',
          'Toltén': '#98FB98',
          'Teodoro Schmidt': '#2E8B57',
          'Puerto Saavedra': '#90CE90',
          'Carahue': '#B8E6B8',
          'Nueva Imperial': '#C1E6C1',
          'Galvarino': '#F7DC6F',
          'Padre Las Casas': '#2F4F4F',
          'Cholchol': '#AED6F1'
        },
        'Biobio': {
          'Los Ángeles': '#0088CC',
          'Cabrero': '#003366',
          'Tucapel': '#E6D5A7',
          'Antuco': '#E6D5A7',
          'Quilleco': '#A8E6F4',
          'Santa Bárbara': '#C4B7D7',
          'Quilaco': '#6699CC',
          'Mulchén': '#99CCDD',
          'Negrete': '#006699',
          'Nacimiento': '#CCE6CC',
          'Laja': '#B3D9E6',
          'San Rosendo': '#80CCEE',
          'Yumbel': '#0099CC',
          'Concepción': '#D5E6D5',
          'Talcahuano': '#CC9966',
          'Penco': '#E6D5A7',
          'Tomé': '#006699',
          'Florida': '#E6D5A7',
          'Hualqui': '#0088CC',
          'Santa Juana': '#B3D9E6',
          'Lota': '#99CCDD',
          'Coronel': '#CCE6F2',
          'San Pedro de la Paz': '#80CCEE',
          'Chiguayante': '#99CCDD',
          'Lebu': '#9966CC',
          'Arauco': '#006699',
          'Curanilahue': '#99CCDD',
          'Los Álamos': '#C4B7D7',
          'Cañete': '#E6D5A7',
          'Contulmo': '#0066CC',
          'Tirúa': '#99CCDD'
        },
        'Maule': {
          'Curicó': '#9FE5F0',
          'Teno': '#BFF0D4',
          'Romeral': '#E0F7E7',
          'Molina': '#AEE1F9',
          'Sagrada Familia': '#B8C8E7',
          'Licantén': '#FFFFFF',
          'Vichuquén': '#5CB3D0',
          'Rauco': '#71C5E7',
          'Talca': '#8ED7F2',
          'Pelarco': '#7CCBE8',
          'Río Claro': '#69BDE1',
          'San Clemente': '#A5DEF4',
          'Maule': '#88D1ED',
          'Empedrado': '#7EC9E6',
          'Pencahue': '#6CBFE3',
          'Constitución': '#5BB2D0',
          'Curepto': '#4DA6C8',
          'Linares': '#9DE4EF',
          'Yerbas Buenas': '#8AD8EA',
          'Colbún': '#B1EBF6',
          'Longaví': '#93DBED',
          'Parral': '#7BCCE7',
          'Retiro': '#B4C4E5',
          'Villa Alegre': '#EBC5D5',
          'San Javier': '#8ED7F2',
          'Cauquenes': '#A7E0F5',
          'Pelluhue': '#E8D0D8',
          'Chanco': '#EECDD6'
        },
        'O\'Higgins': {
          'Rancagua': '#7fc4d4',
          'Graneros': '#80b0a8',
          'Mostazal': '#7aa2b2',
          'Codegua': '#99c7d6',
          'Machalí': '#5e97a3',
          'Olivar': '#98b9d1',
          'Requínoa': '#6cbec1',
          'Rengo': '#7cabc1',
          'Malloa': '#91c7cf',
          'Quinta de Tilcoco': '#aacdc0',
          'San Vicente': '#86b0c2',
          'Pichidegua': '#75d2d8',
          'Peumo': '#99a3b6',
          'Doñihue': '#7aa8bd',
          'Las Cabras': '#88bccb',
          'San Fernando': '#648ea8',
          'Chimbarongo': '#7b8fb2',
          'Nancagua': '#61a0ad',
          'Chépica': '#78a7b0',
          'Santa Cruz': '#6eb8c2',
          'Palmilla': '#95b6b7',
          'Peralillo': '#68b4c2',
          'Pichilemu': '#7cbba6',
          'Navidad': '#b3a585',
          'Litueche': '#a69d78',
          'La Estrella': '#9f8f72',
          'Marchihue': '#9a846f',
          'Paredones': '#9e6c52'
        },
        'Valparaíso': {
          'Petorca': '#d2a976',
          'La Ligua': '#a3c9de',
          'Cabildo': '#6b8ab6',
          'Zapallar': '#d3a2a0',
          'Papudo': '#e0c392',
          'Los Andes': '#0f6c5f',
          'San Esteban': '#219ebc',
          'Rinconada': '#b2d9e6',
          'Calle Larga': '#d3e7ef',
          'Santa María': '#b1b6d1',
          'San Felipe': '#7fb4d9',
          'Putaendo': '#ccddee',
          'Panquehue': '#99c0d1',
          'Catemu': '#c2a3d9',
          'Llaillay': '#88aab8',
          'Quillota': '#96c7b3',
          'La Cruz': '#8a9eb5',
          'Nogales': '#a1a2c3',
          'Hijuelas': '#5a87a8',
          'Calera': '#2e4972',
          'Limache': '#486b92',
          'Olmué': '#769db4',
          'Villa Alemana': '#9fadc3',
          'Quilpué': '#80a3c1',
          'Concón': '#66b9d4',
          'Valparaíso': '#669fd9',
          'Viña del Mar': '#4d7ec7',
          'Puchuncaví': '#3060c7',
          'Quintero': '#1e5ea0',
          'Casablanca': '#1a4068',
          'San Antonio': '#4179aa',
          'Cartagena': '#b3d4e4',
          'El Quisco': '#7ea8c0',
          'El Tabo': '#a1c4d4',
          'Algarrobo': '#5d91b6',
          'Santo Domingo': '#a9d3a7'
        },
        'Coquimbo': {
          'La Serena': '#d9a789',
          'Coquimbo': '#b68578',
          'Andacollo': '#d1a7cb',
          'La Higuera': '#c8b39e',
          'Vicuña': '#d4a6a5',
          'Paihuano': '#e3b7af',
          'Monte Patria': '#d8b1a4',
          'Combarbalá': '#b98b85',
          'Ovalle': '#bf7265',
          'Punitaqui': '#d09c93',
          'Río Hurtado': '#a2b9b4',
          'Salamanca': '#e28f8f',
          'Illapel': '#cf7474',
          'Los Vilos': '#b9a99d',
          'Canela': '#e6b9a4'
        },
        'Atacama': {
          'Copiapó': '#d1a3a4',
          'Caldera': '#a4c4b5',
          'Chañaral': '#f2b6b6',
          'Diego de Almagro': '#f4c7a1',
          'Vallenar': '#f3e2c6',
          'Huasco': '#e8d3b9',
          'Freirina': '#c6e2e8',
          'Tierra Amarilla': '#e1b0a2',
          'Alto del Carmen': '#f4a4b5'
        },
        'Antofagasta': {
          'Antofagasta': '#E8D0C1',
          'María Elena': '#F2A594',
          'Mejillones': '#FFC4AD',
          'Sierra Gorda': '#E6DCEF',
          'Taltal': '#D5A4CC',
          'Tocopilla': '#7EBCB6',
          'Calama': '#E88B83',
          'San Pedro de Atacama': '#F2B998',
          'Ollagüe': '#A9DEF9'
        },
        'Tarapacá': {
          'Iquique': '#F4A2A2',
          'Alto Hospicio': '#F9C285',
          'Pozo Almonte': '#E38E8E',
          'Pica': '#C8A4D8',
          'Camiña': '#8AD4E4',
          'Colchane': '#F8DDA0'
        },
        'NorPoniente': {
          'Independencia': '#f4b6c2',
          'Conchalí': '#c1c8e4',
          'Huechuraba': '#ffdecc',
          'Recoleta': '#a1d3e2',
          'Estación Central': '#d4a5a5',
          'Cerrillos': '#b5e7a0',
          'Maipú': '#c39bd3',
          'Quinta Normal': '#ffcccb',
          'Lo Prado': '#b2d8d8',
          'Pudahuel': '#ffd3b6',
          'Cerro Navia': '#98d7c2',
          'Renca': '#f7cac9',
          'Quilicura': '#d5a6bd',
          'Santiago': '#ffe5b4'
        },
        'Sur Oriente': {
          'Santiago': '#ffb6c1',
          'Providencia': '#c1c8e4',
          'Lo Barnechea': '#ffab91',
          'Las Condes': '#a1d3e2',
          'Ñuñoa': '#d4a5a5',
          'La Reina': '#b5e7a0',
          'Macul': '#c39bd3',
          'La Florida': '#ffcccb',
          'Peñalolén': '#b2d8d8',
          'San Joaquín': '#ffd3b6',
          'La Granja': '#98d7c2',
          'La Pintana': '#f7cac9',
          'San Ramón': '#d5a6bd',
          'San Miguel': '#ffe5b4',
          'La Cisterna': '#f8b6d1',
          'El Bosque': '#f9dda0',
          'Pedro Aguirre Cerda': '#d1c4e9',
          'Lo Espejo': '#bbdefb',
          'Puente Alto': '#b39ddb',
          'Pirque': '#ffcc80',
          'San José de Maipo': '#ffab91'
        },
        'Rural Norponiente': {
          'Alhué': '#f8b6d1',
          'Buin': '#f9dda0',
          'Calera de Tango': '#d1c4e9',
          'Colina': '#bbdefb',
          'Curacaví': '#b39ddb',
          'El Monte': '#ffcc80',
          'Isla de Maipo': '#ffab91',
          'Lampa': '#c8e6c9',
          'María Pinto': '#e6ee9c',
          'Melipilla': '#fff59d',
          'Padre Hurtado': '#ffccbc',
          'Paine': '#dcedc8',
          'Peñaflor': '#f48fb1',
          'San Pedro': '#ce93d8',
          'Talagante': '#b0bec5',
          'Til Til': '#ffe082',
          'San Bernardo': '#c5e1a5'
        }
      };

  // Método para obtener el color claro para el encabezado de una región
  getRegionLightColor(regionName: string): string {
    const regionColors = this.getRegionColors(regionName);
    const communes = Object.keys(regionColors);
    return communes.length > 0 ? regionColors[communes[0]] : '#E6F3FF';
  }
// Método para obtener el color del texto para las tarjetas de una región
getRegionTextColor(regionName: string): string {
  const normalizedRegionName = this.normalizeText(regionName);
  const predefinedRegions = ['tarapaca', 'arica y parinacota', 'antofagasta', 'atacama', 'coquimbo'];
  const blueRegions = ['valparaiso', 'nuble', 'o higgins', 'maule', 'biobio'];

  if (predefinedRegions.includes(normalizedRegionName)) {
    return '#b4664d';
  }

  if (blueRegions.includes(normalizedRegionName)) {
    return '#237ba7';
  }

  return '#000000';
}
getRegionDarkColor(regionName: string): string {
  const normalizedRegionName = this.normalizeText(regionName);
  const predefinedRegions = ['tarapaca', 'arica y parinacota', 'antofagasta', 'atacama', 'coquimbo'];
  const blueRegions = ['valparaiso', 'nuble', 'o higgins', 'maule', 'biobio'];

  if (predefinedRegions.includes(normalizedRegionName)) {
    return '#fbbb93';
  }
  
  if (blueRegions.includes(normalizedRegionName)) {
    return '#4bc2ea'; // Darker shade of #6bcce3
  }

  const lightColor = this.getRegionLightColor(regionName);
  return this.darkenColor(lightColor, 0.2);
}

  // Método para oscurecer un color hexadecimal en un porcentaje dado
  private darkenColor(color: string, percentage: number): string {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.floor(r * (1 - percentage));
    g = Math.floor(g * (1 - percentage));
    b = Math.floor(b * (1 - percentage));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private normalizeText(text: string): string {
    return text.normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")  // Eliminar tildes
               .toLowerCase()
               .trim();
  }

  getRegionColors(regionName: string): { [key: string]: string } {
    const normalizedRegionName = this.normalizeText(regionName);
    console.log("Region normalizada", normalizedRegionName);
    
    const predefinedRegions = ['tarapaca', 'arica y parinacota', 'antofagasta', 'atacama', 'coquimbo'];
    const blueRegions = ['valparaiso', 'nuble', 'o higgins', 'maule', 'biobio'];
    
    if (predefinedRegions.includes(normalizedRegionName)) {
      return { 'default': '#fbe4a6' };
    }
    
    if (blueRegions.includes(normalizedRegionName)) {
      return { 'default': '#dbebf7' };
    }
  
    const regionColors = Object.entries(this.regionColors)
      .find(([key]) => this.normalizeText(key) === normalizedRegionName);
      
    return regionColors ? regionColors[1] : {};
  }

  getAllRegions(): string[] {
    return [...new Set(Object.keys(this.regionColors))];
  }

  getCommuneColor(regionName: string, communeName: string): string {
    if (!regionName || !communeName) {
      console.warn('Nombre de región o comuna vacío');
      return '#E6F3FF';
    }

    const normalizedRegionName = this.normalizeText(regionName);
    const normalizedCommuneName = this.normalizeText(communeName);

    // Buscar en todas las variantes de la región
    for (const [key, colors] of Object.entries(this.regionColors)) {
      if (this.normalizeText(key) === normalizedRegionName) {
        // Buscar la comuna normalizada
        for (const [comuna, color] of Object.entries(colors)) {
          if (this.normalizeText(comuna) === normalizedCommuneName) {
            return color;
          }
        }
      }
    }

    console.warn(`No se encontró color para ${regionName}/${communeName}`);
    return '#E6F3FF';
  }

  hasRegion(regionName: string): boolean {
    const normalizedRegionName = this.normalizeText(regionName);
    return Object.keys(this.regionColors)
      .some(key => this.normalizeText(key) === normalizedRegionName);
  }

  getCommunes(regionName: string): string[] {
    return Object.keys(this.regionColors[regionName] || {});
  }

  // Método para registrar la información de una región
  logRegionInfo(regionName: string): void {
    const normalizedRegionName = this.normalizeText(regionName);
    const regionExists = this.hasRegion(regionName);
    const regionColors = this.getRegionColors(regionName);

    //console.log('Información de la región:', {
    //  nombre: regionName,
    //  nombreNormalizado: normalizedRegionName,
    //  existeRegion: regionExists,
    //  comunas: Object.keys(regionColors),
    //  coloresDisponibles: regionColors
    //});
  }

  // Método auxiliar para obtener todas las comunas de una región
  getCommunesForRegion(regionName: string): string[] {
    const colors = this.getRegionColors(regionName);
    return Object.keys(colors);
  }
  // Agregar estos métodos al final de la clase MapColorsService

  getImageFilter(color: string) {
    if (color) {
      // Si el color está en formato hex, conviértelo a RGB
      let rgbColor = color;
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        rgbColor = `rgb(${r}, ${g}, ${b})`;
      }
      // Filtro ajustado para mantener la visibilidad
      return `brightness(0.8) sepia(1) hue-rotate(${this.calculateHueRotate(rgbColor)}deg) saturate(5)`;
    }
    return '';
  }

// Método privado para calcular la rotación del matiz
private calculateHueRotate(color: string): number {
  const matches = color.match(/\d+/g);
  if (matches) {
    const [r, g, b] = matches.map(Number);
    // Calcular el ángulo de rotación de matiz basado en el color predominante
    const hue = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;
    return hue;
  }
  return 0;
}

/// También ajusta el método getRegionImageFilter
getRegionImageFilter(regionName: string): string {
  const color = this.getRegionLightColor(regionName);
  if (!color) return '';
  
  // Ajusta estos valores según sea necesario para tu caso específico
  return `brightness(0.8) sepia(0.5) hue-rotate(${this.calculateHueRotate(color)}deg) saturate(2)`;
}
}

// src/app/services/map-colors.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapColorsService {
    regionColors: { [key: string]: { [key: string]: string } } = {
      'Ñuble': {
        'Chillán': '#38BDF8', // Tailwind sky-400
        'Chillán Viejo': '#D1FAE5', // Tailwind green-200
        'San Ignacio': '#FECACA', // Tailwind red-200
        'El Carmen': '#134E4A', // Tailwind teal-900
        'Yungay': '#7DD3FC', // Tailwind sky-300
        'Pemuco': '#E0F2FE', // Tailwind sky-100
        'Bulnes': '#FDE68A', // Tailwind orange-100
        'Quillón': '#075985', // Tailwind sky-800
        'San Carlos': '#22D3EE', // Tailwind cyan-300
        'Ñiquén': '#0F766E', // Tailwind teal-800
        'San Fabián': '#3B82F6', // Tailwind blue-500
        'Coihueco': '#C4B5FD', // Tailwind indigo-200
        'San Nicolás': '#0284C7', // Tailwind sky-700
        'Ranquil': '#06B6D4', // Tailwind cyan-600
        'Portezuelo': '#F97316', // Tailwind orange-500
        'Coelemu': '#6EE7B7', // Tailwind green-300
        'Treguaco': '#86EFAC', // Tailwind green-400
        'Cobquecura': '#075985', // Tailwind sky-800
        'Quirihue': '#BAE6FD', // Tailwind sky-200
        'Ninhue': '#6D28D9', // Tailwind purple-800
        'Pinto': '#2DD4BF' // Tailwind teal-500
      },
      'Arica y Parinacota': {
        'Arica': '#E0E7FF', // Tailwind indigo-100
        'Putre': '#FEF9C3', // Tailwind yellow-100
        'General Lagos': '#FCA5A5', // Tailwind red-300
        'Camarones': '#F9A8D4' // Tailwind pink-300
      },
      'Magallanes': {
        'Natales': '#5EEAD4', // Tailwind teal-300
        'Punta Arenas': '#14532D', // Tailwind green-800
        'Porvenir': '#86EFAC', // Tailwind green-300
        'Torres del Paine': '#FACC15' // Tailwind yellow-400
      },
      'Aysén': {
        'Coyhaique': '#5FD1DB', // Tailwind teal-200
        'Lago Verde': '#134E4A', // Tailwind teal-900
        'Aysén': '#86EFAC', // Tailwind green-300
        'Cisnes': '#14532D', // Tailwind green-800
        'Guaitecas': '#FACC15', // Tailwind yellow-400
        'Río Ibañez': '#FFE4E6', // Tailwind rose-100
        'Cochrane': '#65A30D', // Tailwind green-600
        'O\'Higgins': '#14532D' // Tailwind green-800
      },
      'Los Lagos': {
        'Osorno': '#BAE6FD', // Tailwind sky-200
        'San Pablo': '#166534', // Tailwind green-900
        'Puyehue': '#D1FAE5', // Tailwind green-200
        'Purranque': '#FACC15', // Tailwind yellow-400
        'Río Negro': '#FACC15', // Tailwind yellow-400
        'Puerto Montt': '#166534', // Tailwind green-900
        'Puerto Varas': '#14532D', // Tailwind green-800
        'Cochamó': '#DBEAFE', // Tailwind blue-100
        'Calbuco': '#86EFAC', // Tailwind green-300
        'Maullín': '#FACC15', // Tailwind yellow-400
        'Los Muermos': '#155E75', // Tailwind cyan-700
        'Fresia': '#166534', // Tailwind green-800
        'Llanquihue': '#BBF7D0', // Tailwind green-200
        'Frutillar': '#86EFAC', // Tailwind green-300
        'Castro': '#6EE7B7', // Tailwind green-300
        'Ancud': '#D1FAE5', // Tailwind green-200
        'Quemchi': '#166534', // Tailwind green-900
        'Dalcahue': '#166534', // Tailwind green-800
        'Curaco de Vélez': '#86EFAC', // Tailwind green-300
        'Quinchao': '#6EE7B7', // Tailwind green-300
        'Puqueldón': '#86EFAC', // Tailwind green-300
        'Chonchi': '#D1FAE5', // Tailwind green-200
        'Queilén': '#6EE7B7', // Tailwind green-300
        'Quellón': '#166534', // Tailwind green-800
        'Hualaihué': '#FACC15', // Tailwind yellow-400
        'Futaleufú': '#166534', // Tailwind green-900
        'Palena': '#155E75' // Tailwind cyan-700
      },
      'Los Ríos': {
        'Valdivia': '#86EFAC', // Tailwind green-300
        'Corral': '#166534', // Tailwind green-900
        'Lanco': '#14532D', // Tailwind green-800
        'Los Lagos': '#FFE4E6', // Tailwind rose-100
        'Máfil': '#BBF7D0', // Tailwind green-200
        'Mariquina': '#FACC15', // Tailwind yellow-400
        'Paillaco': '#155E75', // Tailwind cyan-700
        'Panguipulli': '#86EFAC', // Tailwind green-300
        'La Unión': '#6EE7B7', // Tailwind green-300
        'Futrono': '#D1FAE5', // Tailwind green-200
        'Lago Ranco': '#14532D', // Tailwind green-800
        'Río Bueno': '#4CAF50' // Tailwind green-500
      },
      'Araucania': {
        'Angol': '#86EFAC', // Tailwind green-300
        'Renaico': '#FFE4E6', // Tailwind rose-100
        'Collipulli': '#D1FAE5', // Tailwind green-200
        'Lonquimay': '#14532D', // Tailwind green-800
        'Curacautín': '#6EE7B7', // Tailwind green-300
        'Ercilla': '#D1FAE5', // Tailwind green-200
        'Victoria': '#A7F3D0', // Tailwind green-200
        'Traiguén': '#D1FAE5', // Tailwind green-200
        'Lumaco': '#064E3B', // Tailwind emerald-900
        'Purén': '#FDE047', // Tailwind yellow-300
        'Los Sauces': '#FDE047', // Tailwind yellow-300
        'Temuco': '#A3F2E4', // Tailwind teal-200
        'Lautaro': '#FFE4E6', // Tailwind rose-100
        'Perquenco': '#86EFAC', // Tailwind green-300
        'Vilcún': '#155E75', // Tailwind cyan-700
        'Cunco': '#FDE047', // Tailwind yellow-300
        'Melipeuco': '#6EE7B7', // Tailwind green-300
        'Curarrehue': '#FFE4E6', // Tailwind rose-100
        'Pucón': '#FFE4E6', // Tailwind rose-100
        'Villarrica': '#DBEAFE', // Tailwind blue-100
        'Freire': '#D1FAE5', // Tailwind green-200
        'Pitrufquén': '#14532D', // Tailwind green-800
        'Gorbea': '#FDE047', // Tailwind yellow-300
        'Loncoche': '#D1FAE5', // Tailwind green-200
        'Toltén': '#6EE7B7', // Tailwind green-300
        'Teodoro Schmidt': '#14532D', // Tailwind green-800
        'Puerto Saavedra': '#86EFAC', // Tailwind green-300
        'Carahue': '#D1FAE5', // Tailwind green-200
        'Nueva Imperial': '#A7F3D0', // Tailwind green-200
        'Galvarino': '#FDE047', // Tailwind yellow-300
        'Padre Las Casas': '#1E293B', // Tailwind slate-900
        'Cholchol': '#DBEAFE' // Tailwind blue-100
      },
      'Biobio': {
        'Los Ángeles': '#0284C7', // Tailwind sky-600
        'Cabrero': '#1E40AF', // Tailwind blue-900
        'Tucapel': '#FDE68A', // Tailwind amber-200
        'Antuco': '#FDE68A', // Tailwind amber-200
        'Quilleco': '#22D3EE', // Tailwind cyan-300
        'Santa Bárbara': '#D8B4FE', // Tailwind purple-300
        'Quilaco': '#60A5FA', // Tailwind blue-400
        'Mulchén': '#38BDF8', // Tailwind sky-400
        'Negrete': '#075985', // Tailwind sky-800
        'Nacimiento': '#86EFAC', // Tailwind green-300
        'Laja': '#BAE6FD', // Tailwind sky-200
        'San Rosendo': '#67E8F9', // Tailwind cyan-200
        'Yumbel': '#0284C7', // Tailwind sky-600
        'Concepción': '#D1FAE5', // Tailwind green-200
        'Talcahuano': '#D97706', // Tailwind amber-600
        'Penco': '#FDE68A', // Tailwind amber-200
        'Tomé': '#075985', // Tailwind sky-800
        'Florida': '#FDE68A', // Tailwind amber-200
        'Hualqui': '#0284C7', // Tailwind sky-600
        'Santa Juana': '#BAE6FD', // Tailwind sky-200
        'Lota': '#38BDF8', // Tailwind sky-400
        'Coronel': '#BAE6FD', // Tailwind sky-200
        'San Pedro de la Paz': '#67E8F9', // Tailwind cyan-200
        'Chiguayante': '#38BDF8', // Tailwind sky-400
        'Lebu': '#9333EA', // Tailwind purple-600
        'Arauco': '#075985', // Tailwind sky-800
        'Curanilahue': '#38BDF8', // Tailwind sky-400
        'Los Álamos': '#D8B4FE', // Tailwind purple-300
        'Cañete': '#FDE68A', // Tailwind amber-200
        'Contulmo': '#2563EB', // Tailwind blue-500
        'Tirúa': '#38BDF8' // Tailwind sky-400
      },
    
        'Maule': {
    'Curicó': '#BAE6FD', // Tailwind sky-200
    'Teno': '#BBF7D0', // Tailwind green-200
    'Romeral': '#D1FAE5', // Tailwind green-200
    'Molina': '#7DD3FC', // Tailwind sky-300
    'Sagrada Familia': '#C7D2FE', // Tailwind indigo-200
    'Licantén': '#FFFFFF', // Tailwind white
    'Vichuquén': '#38BDF8', // Tailwind sky-400
    'Rauco': '#67E8F9', // Tailwind cyan-200
    'Talca': '#38BDF8', // Tailwind sky-400
    'Pelarco': '#67E8F9', // Tailwind cyan-200
    'Río Claro': '#7DD3FC', // Tailwind sky-300
    'San Clemente': '#BAE6FD', // Tailwind sky-200
    'Maule': '#7DD3FC', // Tailwind sky-300
    'Empedrado': '#67E8F9', // Tailwind cyan-200
    'Pencahue': '#38BDF8', // Tailwind sky-400
    'Constitución': '#38BDF8', // Tailwind sky-400
    'Curepto': '#2563EB', // Tailwind blue-500
    'Linares': '#BAE6FD', // Tailwind sky-200
    'Yerbas Buenas': '#67E8F9', // Tailwind cyan-200
    'Colbún': '#BAE6FD', // Tailwind sky-200
    'Longaví': '#67E8F9', // Tailwind cyan-200
    'Parral': '#67E8F9', // Tailwind cyan-200
    'Retiro': '#C7D2FE', // Tailwind indigo-200
    'Villa Alegre': '#F9A8D4', // Tailwind pink-300
    'San Javier': '#7DD3FC', // Tailwind sky-300
    'Cauquenes': '#BAE6FD', // Tailwind sky-200
    'Pelluhue': '#FFE4E6', // Tailwind rose-100
    'Chanco': '#FFE4E6' // Tailwind rose-100
  },
  'ohiggins': {
    'Rancagua': '#7DD3FC', // Tailwind sky-300
    'Graneros': '#4ADE80', // Tailwind green-400
    'Mostazal': '#2DD4BF', // Tailwind teal-500
    'Codegua': '#22D3EE', // Tailwind cyan-300
    'Machalí': '#0284C7', // Tailwind sky-600
    'Olivar': '#A5B4FC', // Tailwind indigo-300
    'Requínoa': '#22C55E', // Tailwind green-500
    'Rengo': '#4ADE80', // Tailwind green-400
    'Malloa': '#BAE6FD', // Tailwind sky-200
    'Quinta de Tilcoco': '#D1FAE5', // Tailwind green-200
    'San Vicente': '#7DD3FC', // Tailwind sky-300
    'Pichidegua': '#2DD4BF', // Tailwind teal-500
    'Peumo': '#A7F3D0', // Tailwind emerald-200
    'Doñihue': '#7DD3FC', // Tailwind sky-300
    'Las Cabras': '#86EFAC', // Tailwind green-300
    'San Fernando': '#0284C7', // Tailwind sky-600
    'Chimbarongo': '#7DD3FC', // Tailwind sky-300
    'Nancagua': '#22D3EE', // Tailwind cyan-300
    'Chépica': '#0284C7', // Tailwind sky-600
    'Santa Cruz': '#38BDF8', // Tailwind sky-400
    'Palmilla': '#BAE6FD', // Tailwind sky-200
    'Peralillo': '#2DD4BF', // Tailwind teal-500
    'Pichilemu': '#4ADE80', // Tailwind green-400
    'Navidad': '#A3E635', // Tailwind lime-400
    'Litueche': '#A3E635', // Tailwind lime-400
    'La Estrella': '#84CC16', // Tailwind lime-500
    'Marchihue': '#84CC16', // Tailwind lime-500
    'Paredones': '#65A30D' // Tailwind green-600
  },
'Valparaíso': {
    'Petorca': '#FBBF24', // Tailwind amber-400
    'La Ligua': '#7DD3FC', // Tailwind sky-300
    'Cabildo': '#60A5FA', // Tailwind blue-400
    'Zapallar': '#FCA5A5', // Tailwind red-300
    'Papudo': '#FCD34D', // Tailwind yellow-300
    'Los Andes': '#166534', // Tailwind green-900
    'San Esteban': '#0EA5E9', // Tailwind sky-500
    'Rinconada': '#BAE6FD', // Tailwind sky-200
    'Calle Larga': '#DBEAFE', // Tailwind blue-100
    'Santa María': '#C7D2FE', // Tailwind indigo-200
    'San Felipe': '#60A5FA', // Tailwind blue-400
    'Putaendo': '#E0E7FF', // Tailwind indigo-100
    'Panquehue': '#A5B4FC', // Tailwind indigo-300
    'Catemu': '#C4B5FD', // Tailwind purple-300
    'Llaillay': '#67E8F9', // Tailwind cyan-200
    'Quillota': '#A3E635', // Tailwind lime-400
    'La Cruz': '#60A5FA', // Tailwind blue-400
    'Nogales': '#818CF8', // Tailwind indigo-500
    'Hijuelas': '#0284C7', // Tailwind sky-600
    'Calera': '#1E3A8A', // Tailwind blue-800
    'Limache': '#1E40AF', // Tailwind blue-900
    'Olmué': '#3B82F6', // Tailwind blue-500
    'Villa Alemana': '#818CF8', // Tailwind indigo-500
    'Quilpué': '#67E8F9', // Tailwind cyan-200
    'Concón': '#7DD3FC', // Tailwind sky-300
    'Valparaíso': '#2563EB', // Tailwind blue-500
    'Viña del Mar': '#1D4ED8', // Tailwind blue-700
    'Puchuncaví': '#1E3A8A', // Tailwind blue-800
    'Quintero': '#0C4A6E', // Tailwind cyan-900
    'Casablanca': '#0F172A', // Tailwind slate-900
    'San Antonio': '#1D4ED8', // Tailwind blue-700
    'Cartagena': '#BAE6FD', // Tailwind sky-200
    'El Quisco': '#38BDF8', // Tailwind sky-400
    'El Tabo': '#7DD3FC', // Tailwind sky-300
    'Algarrobo': '#0284C7', // Tailwind sky-600
    'Santo Domingo': '#86EFAC' // Tailwind green-300
  },
  'Coquimbo': {
    'La Serena': '#FDE68A', // Tailwind amber-200
    'Coquimbo': '#FB923C', // Tailwind orange-400
    'Andacollo': '#FBCFE8', // Tailwind pink-200
    'La Higuera': '#FCD34D', // Tailwind yellow-300
    'Vicuña': '#FCA5A5', // Tailwind red-300
    'Paihuano': '#F87171', // Tailwind red-400
    'Monte Patria': '#FDA4AF', // Tailwind pink-300
    'Combarbalá': '#F87171', // Tailwind red-400
    'Ovalle': '#FB7185', // Tailwind rose-400
    'Punitaqui': '#FCA5A5', // Tailwind red-300
    'Río Hurtado': '#2DD4BF', // Tailwind teal-500
    'Salamanca': '#F87171', // Tailwind red-400
    'Illapel': '#FB7185', // Tailwind rose-400
    'Los Vilos': '#FCD34D', // Tailwind yellow-300
    'Canela': '#FBCFE8' // Tailwind pink-200
  },
  'Atacama': {
    'Copiapó': '#FCA5A5', // Tailwind red-300
    'Caldera': '#86EFAC', // Tailwind green-300
    'Chañaral': '#F87171', // Tailwind red-400
    'Diego de Almagro': '#FCD34D', // Tailwind yellow-300
    'Vallenar': '#FDE68A', // Tailwind amber-200
    'Huasco': '#FDE68A', // Tailwind amber-200
    'Freirina': '#67E8F9', // Tailwind cyan-200
    'Tierra Amarilla': '#FCA5A5', // Tailwind red-300
    'Alto del Carmen': '#FECACA' // Tailwind red-200
  },
  'Antofagasta': {
    'Antofagasta': '#FCD34D', // Tailwind yellow-300
    'María Elena': '#FB923C', // Tailwind orange-400
    'Mejillones': '#FECACA', // Tailwind red-200
    'Sierra Gorda': '#C084FC', // Tailwind purple-400
    'Taltal': '#C4B5FD', // Tailwind purple-300
    'Tocopilla': '#2DD4BF', // Tailwind teal-500
    'Calama': '#F87171', // Tailwind red-400
    'San Pedro de Atacama': '#FDE68A', // Tailwind amber-200
    'Ollagüe': '#A5F3FC' // Tailwind cyan-200
  },
  'Tarapacá': {
    'Iquique': '#fecaca', // Tailwind red-200
    'Alto Hospicio': '#fde68a', // Tailwind yellow-200
    'Pozo Almonte': '#fda4af', // Tailwind rose-300
    'Pica': '#C4B5FD', // Tailwind purple-300
    'Camiña': '#BAE6FD', // Tailwind sky-200
    'Colchane': '#FDE68A' // Tailwind amber-200
  },
'NorPoniente': {
    'Independencia': '#FECACA', // Tailwind red-200
    'Conchalí': '#A5B4FC', // Tailwind indigo-300
    'Huechuraba': '#FED7AA', // Tailwind orange-200
    'Recoleta': '#7DD3FC', // Tailwind sky-300
    'Estación Central': '#FCA5A5', // Tailwind red-300
    'Cerrillos': '#86EFAC', // Tailwind green-300
    'Maipú': '#C4B5FD', // Tailwind purple-300
    'Quinta Normal': '#FECACA', // Tailwind red-200
    'Lo Prado': '#BAE6FD', // Tailwind sky-200
    'Pudahuel': '#FED7AA', // Tailwind orange-200
    'Cerro Navia': '#A3E635', // Tailwind lime-400
    'Renca': '#FCA5A5', // Tailwind red-300
    'Quilicura': '#C4B5FD', // Tailwind purple-300
    'Santiago': '#FDE68A' // Tailwind amber-200
  },
  'Sur Oriente': {
    'Santiago': '#FECACA', // Tailwind red-200
    'Providencia': '#A5B4FC', // Tailwind indigo-300
    'Lo Barnechea': '#FED7AA', // Tailwind orange-200
    'Las Condes': '#7DD3FC', // Tailwind sky-300
    'Ñuñoa': '#FCA5A5', // Tailwind red-300
    'La Reina': '#86EFAC', // Tailwind green-300
    'Macul': '#C4B5FD', // Tailwind purple-300
    'La Florida': '#FECACA', // Tailwind red-200
    'Peñalolén': '#BAE6FD', // Tailwind sky-200
    'San Joaquín': '#FED7AA', // Tailwind orange-200
    'La Granja': '#A3E635', // Tailwind lime-400
    'La Pintana': '#FCA5A5', // Tailwind red-300
    'San Ramón': '#C4B5FD', // Tailwind purple-300
    'San Miguel': '#FDE68A', // Tailwind amber-200
    'La Cisterna': '#F9A8D4', // Tailwind pink-300
    'El Bosque': '#FDE68A', // Tailwind amber-200
    'Pedro Aguirre Cerda': '#DDD6FE', // Tailwind indigo-100
    'Lo Espejo': '#DBEAFE', // Tailwind blue-100
    'Puente Alto': '#C4B5FD', // Tailwind purple-300
    'Pirque': '#FED7AA', // Tailwind orange-200
    'San José de Maipo': '#F9A8D4' // Tailwind pink-300
  },
  'Rural Norponiente': {
    'Alhué': '#F9A8D4', // Tailwind pink-300
    'Buin': '#FDE68A', // Tailwind amber-200
    'Calera de Tango': '#DDD6FE', // Tailwind indigo-100
    'Colina': '#DBEAFE', // Tailwind blue-100
    'Curacaví': '#C4B5FD', // Tailwind purple-300
    'El Monte': '#FED7AA', // Tailwind orange-200
    'Isla de Maipo': '#F9A8D4', // Tailwind pink-300
    'Lampa': '#BBF7D0', // Tailwind green-200
    'María Pinto': '#D9F99D', // Tailwind lime-200
    'Melipilla': '#FEF08A', // Tailwind yellow-200
    'Padre Hurtado': '#FED7AA', // Tailwind orange-200
    'Paine': '#D9F99D', // Tailwind lime-200
    'Peñaflor': '#FECACA', // Tailwind red-200
    'San Pedro': '#E9D5FF', // Tailwind purple-200
    'Talagante': '#CBD5E1', // Tailwind slate-300
    'Til Til': '#FDE047', // Tailwind yellow-300
    'San Bernardo': '#BBF7D0' // Tailwind green-200
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
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/['']/g, '') // Remover apóstrofes
        .trim();
}

  getRegionColors(regionName: string): { [key: string]: string } {
    const normalizedRegionName = this.normalizeText(regionName);
    //console.log("**** Region normalizada *** ", normalizedRegionName);
    
    const predefinedRegions = ['tarapaca', 'arica y parinacota', 'antofagasta', 'atacama', 'coquimbo'];
    const blueRegions = ['valparaiso', 'nuble', 'ohiggins', 'maule', 'biobio'];
    
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

    // Normalizar los nombres
    const normalizedRegionName = this.normalizeText(regionName);
    const normalizedCommuneName = this.normalizeText(communeName);
   
    //console.log('Region original:' , regionName);
    //console.log('Region normallizada:' , normalizedRegionName);
    
    //console.log('Comuna original:' , communeName);
    //console.log('Comuna normallizada:' , normalizedCommuneName);


    // Debug info
    //console.log('Buscando color para:', {
    //  regionOriginal: regionName,
    //  regionNormalizada: normalizedRegionName,
    //  comunaOriginal: communeName,
    //  comunaNormalizada: normalizedCommuneName
    //});

    // Manejo especial para O'Higgins
    if (normalizedRegionName.includes('ohiggins')) {
      // Buscar en la clave 'O\'Higgins'
      const ohigginsColors = this.regionColors["O'Higgins"];
      if (ohigginsColors) {
        for (const [comuna, color] of Object.entries(ohigginsColors)) {
          if (this.normalizeText(comuna) === normalizedCommuneName) {
            return color;
          }
        }
      }
    }

    // Búsqueda normal para otras regiones
    for (const [key, colors] of Object.entries(this.regionColors)) {
      const normalizedKey = this.normalizeText(key);
      if (normalizedKey === normalizedRegionName) {
        for (const [comuna, color] of Object.entries(colors)) {
          if (this.normalizeText(comuna) === normalizedCommuneName) {
            return color;
          }
        }
      }
    }

    // Si no se encuentra, usar el color por defecto
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

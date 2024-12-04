// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ComunaData {
  codigo: string;
  cantidad: number;
}

interface RegionData {
  [comuna: string]: ComunaData;
}

export interface JardinesPorRegionYComuna {
  [region: string]: RegionData;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private wsdlDataSubject = new BehaviorSubject<any[]>([]);
  private processedDataSubject = new BehaviorSubject<any[]>([]);
  private jardinesPorRegionSubject = new BehaviorSubject<{[key: string]: number}>({});
  private rawWsdlDataSubject = new BehaviorSubject<any[]>([]);
  public rawWsdlData$ = this.rawWsdlDataSubject.asObservable();

  // Nuevo BehaviorSubject para datos por región y comuna
  private jardinesPorRegionYComunaSubject = new BehaviorSubject<JardinesPorRegionYComuna>({});
  public jardinesPorRegionYComuna$ = this.jardinesPorRegionYComunaSubject.asObservable();

  // Observables públicos
  public wsdlData$ = this.wsdlDataSubject.asObservable();
  public processedData$ = this.processedDataSubject.asObservable();
  public jardinesPorRegion$ = this.jardinesPorRegionSubject.asObservable();
  private regionSeleccionadaSubject = new BehaviorSubject<string>('');
  public regionSeleccionada$ = this.regionSeleccionadaSubject.asObservable();

  constructor() {}

  // Métodos para actualizar los datos
  updateWsdlData(data: any[]) {
    this.wsdlDataSubject.next(data);
  }

  updateProcessedData(data: any[]) {
    this.processedDataSubject.next(data);
  }

  updateJardinesPorRegion(data: {[key: string]: number}) {
    this.jardinesPorRegionSubject.next(data);
  }

  updateRawWsdlData(data: any[]) {
    this.rawWsdlDataSubject.next(data);
  }

  // Método para obtener el valor actual
  getCurrentWsdlData(): any[] {
    return this.wsdlDataSubject.getValue();
  }

  getCurrentProcessedData(): any[] {
    return this.processedDataSubject.getValue();
  }

  getCurrentJardinesPorRegion(): {[key: string]: number} {
    return this.jardinesPorRegionSubject.getValue();
  }

  getCurrentRawWsdlData(): any[] {
    return this.rawWsdlDataSubject.getValue();
  }

  getCurrentJardinesPorRegionYComuna(): JardinesPorRegionYComuna {
    return this.jardinesPorRegionYComunaSubject.getValue();
  }

  // Método para procesar la respuesta XML
  parseXmlResponse(xml: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const returnNode = xmlDoc.getElementsByTagName('return')[0];
    
    if (returnNode && returnNode.textContent) {
      try {
        let jsonContent = returnNode.textContent.trim();
        const jsonStartIndex = jsonContent.indexOf('[');
        if (jsonStartIndex !== -1) {
          jsonContent = jsonContent.substring(jsonStartIndex);
        }
        if (jsonContent.startsWith('[') && jsonContent.endsWith(']')) {
          const data = JSON.parse(jsonContent);
          const currentData = this.getCurrentProcessedData();
          const newData = [...currentData, ...data];
          this.updateProcessedData(newData);
          this.calculateJardinesPorRegion(newData);
          this.calculateJardinesPorRegionYComuna(newData);

          // Almacenar el resultado completo en rawWsdlData
          const currentRawData = this.getCurrentRawWsdlData();
          const updatedRawData = [...currentRawData, ...data];
          this.updateRawWsdlData(updatedRawData);

          // Mostrar en consola el resultado completo
          console.log('Datos completos del servicio WSDL:', updatedRawData);
          console.log('Cantidad de jardines por región y comuna:');
          this.printResumenJardinesPorRegionYComuna();
        }
      } catch (error) {
        console.error('Error al procesar la respuesta XML:', error);
      }
    }
  }

  // Método para calcular jardines por región
  private calculateJardinesPorRegion(data: any[]) {
    const jardinesPorRegion: {[key: string]: number} = {};
    
    for (const item of data) {
      if (!item.Region) continue;
      
      const region = this.normalizeRegionName(item.Region);
      if (region) {
        jardinesPorRegion[region] = (jardinesPorRegion[region] || 0) + 1;
      }
    }
    
    this.updateJardinesPorRegion(jardinesPorRegion);
  }

  // Método para calcular jardines por región y comuna
  private calculateJardinesPorRegionYComuna(data: any[]) {
    const jardinesPorRegionYComuna: JardinesPorRegionYComuna = {};
    
    data.forEach((item, index) => {
      //console.log(`Procesando elemento ${index}:`, item);
  
      // Verificar y asignar propiedades, adaptándose a los nombres específicos en los datos
      const region = item.Region ? this.normalizeRegionName(item.Region) : null;
      const comuna = item.Comuna ? item.Comuna.trim() : null;
      const codigoComuna = item.CodCom ? item.CodCom : null;
  
      // Validar que las propiedades existen y tienen valores
      if (!region || !comuna || !codigoComuna) {
        console.warn(`Elemento omitido debido a datos incompletos:`, item);
        return; // Omitir elementos sin Región, Comuna o Código de Comuna
      }
  
      // Verificación en consola de los valores procesados
      //console.log(`Región normalizada: ${region}, Comuna: ${comuna}, Código: ${codigoComuna}`);
  
      // Inicializar la región si no existe en el objeto
      if (!jardinesPorRegionYComuna[region]) {
        jardinesPorRegionYComuna[region] = {};
        //console.log(`Nueva región agregada: ${region}`);
      }
  
      // Inicializar la comuna dentro de la región si no existe
      if (!jardinesPorRegionYComuna[region][comuna]) {
        jardinesPorRegionYComuna[region][comuna] = { codigo: codigoComuna, cantidad: 0 };
        //console.log(`Nueva comuna agregada en ${region}: ${comuna} con código ${codigoComuna}`);
      }
  
      // Incrementar el contador de jardines para la comuna
      jardinesPorRegionYComuna[region][comuna].cantidad += 1;
      //console.log(`Cantidad actualizada para ${comuna}, ${region}:`, jardinesPorRegionYComuna[region][comuna].cantidad);
    });
  
    // Ver el resultado final antes de actualizar el BehaviorSubject
    //console.log('Estructura final de jardinesPorRegionYComuna:', jardinesPorRegionYComuna);
  
    // Actualizar el BehaviorSubject
    this.jardinesPorRegionYComunaSubject.next(jardinesPorRegionYComuna);
  }
  
  
  
  // Método para imprimir en consola un resumen de los jardines por región y comuna
  public printResumenJardinesPorRegionYComuna() {
    const jardinesData = this.getCurrentJardinesPorRegionYComuna();
    const resumen = [];

    for (const region in jardinesData) {
      for (const comuna in jardinesData[region]) {
        resumen.push({
          Región: region,
          Comuna: comuna,
          Código: jardinesData[region][comuna].codigo,
          Jardines: jardinesData[region][comuna].cantidad
        });
      }
    }

    console.table(resumen);
  }

  public normalizeRegionName(regionName: string): string {
    const regionMap: { [key: string]: string } = {
      'DEL MAULE': 'MAULE',
      'Maule': 'MAULE',
      'Valparaíso': 'VALPARAISO',
      'Región Metropolitana de Santiago': 'REGION METROPOLITANA DE SANTIAGO',
      'Metropolitana de Santiago': 'REGION METROPOLITANA DE SANTIAGO',
      'Metropolitana': 'REGION METROPOLITANA DE SANTIAGO',
      'Biobío': 'DEL BIOBIO',
      'Los Ríos': 'LOS RIOS',
      'Aysén del General Carlos Ibáñez del Campo': 'AISEN DEL GENERAL CARLOS IBANEZ DEL CAMPO',
      'AISEN DEL GENERAL CARLOS IBANEZ DEL CAMPO': 'AISEN DEL GENERAL CARLOS IBANEZ DEL CAMPO',
      'Magallanes y Antártica Chilena': 'MAGALLANES Y LA ANTARTICA',
      'Arica y Parinacota': 'ARICA Y PARINACOTA',
      'Ñuble': 'DEL NUBLE',
      'Atacama': 'ATACAMA',
      'METROPOLITANA N.P.': 'REGION METROPOLITANA DE SANTIAGO',
      'Metropolitana S.O.': 'REGION METROPOLITANA DE SANTIAGO',
      'METROPOLITANA S.O.': 'REGION METROPOLITANA DE SANTIAGO',
      'AYSEN DEL GRAL. CARLOS IBANEZ DEL CAMPO': 'AISEN DEL GENERAL CARLOS IBANEZ DEL CAMPO',
      'LIBERTADOR GENERAL BERNARDO OHIGGINS': 'LIBERTADOR GENERAL BERNARDO OHIGGINS'
    };

    regionName = regionName.replace(/^DE\s+/i, '');

    const normalizedRegion = regionName
      .toUpperCase()
      .replace(/[Á]/g, 'A')
      .replace(/[É]/g, 'E')
      .replace(/[Í]/g, 'I')
      .replace(/[Ó]/g, 'O')
      .replace(/[Ú]/g, 'U')
      .replace(/[Ñ]/g, 'N')
      .trim();

    return regionMap[normalizedRegion] || normalizedRegion;
  }

  public updateRegionSeleccionada(region: string) {
    if (!region) return;

    // Actualizar el BehaviorSubject con la nueva región
    this.regionSeleccionadaSubject.next(region);
    
    // Actualizar los datos relacionados con la región
    const currentData = this.getCurrentProcessedData();
    if (currentData && currentData.length > 0) {
      const regionData = currentData.filter(item => 
        this.normalizeRegionName(item.Region) === this.normalizeRegionName(region)
      );
      
      // Actualizar datos específicos de la región
      if (regionData.length > 0) {
        this.calculateJardinesPorRegion(regionData);
      }
    }
    
    //console.log('Región seleccionada actualizada:', region);
  }
}

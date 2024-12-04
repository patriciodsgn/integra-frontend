// src/app/components/test-data/test-data.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-test-data',
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Test Data from Azure SQL</h2>
      
      <div *ngIf="loading" class="text-gray-600">
        Cargando datos...
      </div>

      <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Campo 1</th>
              <th class="px-4 py-2">Campo 2</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data">
              <td class="border px-4 py-2">{{ item.id }}</td>
              <td class="border px-4 py-2">{{ item.campo1 }}</td>
              <td class="border px-4 py-2">{{ item.campo2 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button 
        (click)="loadData()" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Recargar Datos
      </button>
    </div>
  `
})
export class TestDataComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';

    this.dataService.getTestData().subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }
}

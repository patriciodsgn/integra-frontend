// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:7071/api'  // URL local de Azure Functions
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-azure-function.azurewebsites.net/api'  // URL de producción
};

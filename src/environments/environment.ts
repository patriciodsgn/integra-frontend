 //environments/environment.ts
export const environment = {
  production: false,
  useMockData: true,
  api: {
      url: 'http://localhost:4200/api',
      timeout: 300,
      retryAttempts: 3
  },
  mock: {
      simulateDelay: true,
      delayMs: 500
  }
};

export const environmentdb = {
  production: false,
  apidb: 'http://localhost:3000/api' // URL base para desarrollo
};


//export const environment = {
//  production: false,
//  useMockData: true,
//  api: {
//      url: 'https://5eb9-181-43-139-167.ngrok-free.app',
//      timeout: 30000,
//      retryAttempts: 3
//  },
//  mock: {
//      simulateDelay: true,
//      delayMs: 500
//  }
//};
//export const environmentdb = {
//  production: false,
//  apidb: 'https://5ed0-2800-300-6b92-a0f0-fc58-490e-afc-b978.ngrok-free.app/api'
//};



// environments/environment.prod.ts
export const environmentp = {
  production: true,
  useMockData: false,
  apiurl: {
      url: 'https://tu-api-azure.com/api',
      timeout: 30000,
      retryAttempts: 3
  },
  mock: {
      simulateDelay: false,
      delayMs: 0
  }
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/login.services';

interface Region {
  CodigoRegion: number;
  NombreRegion: string;
}

interface DatosUsuario {
  CodigoUsuario: number;
  Nombre: string;
  CorreoElectronico: string;
  CodigoRol: number;
  nivelAcceso: string;  // Usando string primitivo
}

interface UserData {
  CorreoElectronico: string;  // Usando string primitivo
  Nombre: string;  // Usando string primitivo
  nivelAcceso: string;  // Usando string primitivo
  region: Region;
}

@Component({
  selector: 'app-view-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css'],
})
export class ViewLoginComponent {
  emailInput: string = 'carlos.jerez@w-ingenieros.cl';
  passwordInput: string = '10977971';
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.showError = false;

    const credentials = {
      CorreoElectronico: this.emailInput,
      RUT: Number(this.passwordInput),
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadUserDetails(this.emailInput);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error en el inicio de sesión';
        this.showError = true;
      },
    });
  }

  private loadUserDetails(correo: string) {
    this.authService.getUsuario(correo).subscribe({
      next: (userResponse) => {
        if (userResponse.success) {
          const datosUsuario = userResponse.data.datosUsuario;
          const region = userResponse.data.region;
          
          const userData: UserData = {
            CorreoElectronico: datosUsuario.CorreoElectronico,
            Nombre: datosUsuario.Nombre,
            nivelAcceso: String(datosUsuario.nivelAcceso).toLowerCase(), // Asegurando string primitivo
            region: region
          };

          // console.log('UserData a guardar:', userData);
          localStorage.setItem('userData', JSON.stringify(userData));

          this.navigateByAccessLevel(userData.nivelAcceso, userData.region);
        }
      },
      error: (error) => {
        console.error('Error detallado:', error);
        this.errorMessage = 'Error al cargar los datos del usuario. Intente nuevamente.';
        this.showError = true;
      },
    });
}

private navigateByAccessLevel(nivelAcceso: string, region: Region) {
  // console.log('NavigateByAccessLevel recibió:', {
  //   nivelAcceso,
  //   tipoNivelAcceso: typeof nivelAcceso,
  //   region
  // });

  // Almacenar nivelAcceso y region en localStorage
  localStorage.setItem('nivelAcceso', nivelAcceso);
  localStorage.setItem('regionSeleccionada', JSON.stringify(region));

  // Mostrar datos almacenados
  // console.log('Datos guardados en localStorage:', {
  //   nivelAcceso: localStorage.getItem('nivelAcceso'),
  //   regionSeleccionada: JSON.parse(localStorage.getItem('regionSeleccionada') || '{}'),
  //   datosCompletos: {
  //     localStorage: {
  //       nivelAcceso: localStorage.getItem('nivelAcceso'),
  //       regionSeleccionada: JSON.parse(localStorage.getItem('regionSeleccionada') || '{}'),
  //       userData: JSON.parse(localStorage.getItem('userData') || '{}')
  //     }
  //   }
  // });

  switch (nivelAcceso.toLowerCase()) {
    case 'nacional': 
      // console.log('Caso Nacional - Navegando a dashboard inicial');
      this.router.navigate(['/custom-dashboard-inicial']);
      break;
    case 'regional':
      // console.log('Caso Regional - Navegando a dashboard regional');
      this.router.navigate(['/region', region.CodigoRegion], {
        queryParams: { 
          regionName: region.NombreRegion
        }
      });
      break;
    default:
      console.error('Nivel de acceso no reconocido:', nivelAcceso);
      this.errorMessage = 'Nivel de acceso no válido';
      this.showError = true;
      break;
  }
}
// Método auxiliar para recuperar la región almacenada (puedes usarlo donde necesites)
private getStoredRegion(): Region | null {
  const storedRegion = localStorage.getItem('regionSeleccionada');
  if (storedRegion) {
      return JSON.parse(storedRegion);
  }
  return null;
}

// Método auxiliar para recuperar el nivel de acceso (puedes usarlo donde necesites)
private getStoredNivelAcceso(): string | null {
  return localStorage.getItem('nivelAcceso');
}

// Método para limpiar los datos almacenados (útil para logout)
private clearStoredUserAccess(): void {
  localStorage.removeItem('nivelAcceso');
  localStorage.removeItem('regionSeleccionada');
}

  navigateToCU() {
    window.location.href =
      'https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/%3Fclient_id%3D9a76efc4c34e4bd7843206658dc45454%26response_type%3Dcode%26scope%3Dopenid%2Brun%2Bname%26redirect_uri%3Dhttps%253A%252F%252Fclaveunica.gob.cl%252Fauth%252Fcallbacklogin%26state%3DbKrRKJiSmMcpG2yTvIOjy1JToks';
  }
}
// view-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/login.services';

@Component({
 selector: 'app-view-login',
 standalone: true,
 imports: [FormsModule, CommonModule],
 templateUrl: './view-login.component.html',
 styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent {
 emailInput: string = '';
 passwordInput: string = '';
 errorMessage: string = '';
 showError: boolean = false;

 constructor(
   private router: Router,
   private authService: AuthService
 ) {}

 onSubmit() {
   this.showError = false;
   const credentials = {
     CorreoElectronico: this.emailInput,
     RUT: Number(this.passwordInput)
   };

   this.authService.login(credentials).subscribe({
     next: (response) => {
       if(response.success) {
         this.navigateToHome();
       }
     },
     error: (error) => {
       this.errorMessage = error.error.message || 'Error en el inicio de sesión';
       this.showError = true;
     }
   });
 }

 navigateToHome() {
   this.router.navigate(['/home']);
 }

 navigateToCU() {
   window.location.href = 'https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/%3Fclient_id%3D9a76efc4c34e4bd7843206658dc45454%26response_type%3Dcode%26scope%3Dopenid%2Brun%2Bname%26redirect_uri%3Dhttps%253A%252F%252Fclaveunica.gob.cl%252Fauth%252Fcallbacklogin%26state%3DbKrRKJiSmMcpG2yTvIOjy1JToks';
 }
}
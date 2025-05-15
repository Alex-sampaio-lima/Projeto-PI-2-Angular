import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-login-input',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-login-input.component.html',
  styleUrl: './container-login-input.component.css'
})
export class ContainerLoginInputComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private userService = inject(UserService);

  constructor(private router: Router) { }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        if (response && response.length > 0 && this.email !== '', this.password !== '' && this.email == this.userService.currentUser.email && this.password == this.userService.currentUser.password) {
          this.router.navigate(['home']);
          console.log('Login realizado com sucesso !');
          if (this.userService.currentUser.isAdmin) {
            console.log("Entrou !");
            this.router.navigate(['adminPedidos']);
          } else {
            this.router.navigate(['home']);
          };
        } else {
          console.log("Email", this.email);
          console.log("Senha", this.password);
          this.errorMessage = 'Email ou senha incorretos';
          console.log(this.errorMessage);
        };
      },
      error => {
        this.errorMessage = 'Ocorreu um erro durante o login';
        alert(this.errorMessage);
      }
    );
  };
};

import { Cliente, SafeUser } from '../../../../../interfaces/user';
import { UserService } from './../../../../../services/user.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-header-info-pedidos',
  imports: [],
  templateUrl: './container-header-info-pedidos.component.html',
  styleUrl: './container-header-info-pedidos.component.css'
})

export class ContainerHeaderInfoPedidosComponent implements OnInit {

  userService = inject(UserService);
  user: SafeUser | null = null;
  nome: SafeUser | string = '';
  ngOnInit(): void {
    const userString = localStorage.getItem("@currentUser");
    if (userString) {
      this.user = JSON.parse(userString) as SafeUser;
      console.log(this.user.nome);
    } else {
      this.user = null;
      this.nome = '';
      console.log(`Usuário não encontrado`);
    }

  };



};

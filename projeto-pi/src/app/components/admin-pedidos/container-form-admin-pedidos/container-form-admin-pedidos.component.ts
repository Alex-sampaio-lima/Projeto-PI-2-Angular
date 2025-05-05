import { Component } from '@angular/core';
import { ContainerHeaderInfoPedidosComponent } from './container-header-info-pedidos/container-header-info-pedidos.component';
import { ContainerInfoPedidoComponent } from "./container-info-pedido/container-info-pedido.component";
import { ContainerFormPedidoComponent } from "./container-form-pedido/container-form-pedido.component";
import { ContainerFormModalPedidoComponent } from './container-form-modal-pedido/container-form-modal-pedido.component';

@Component({
  selector: 'app-container-form-admin-pedidos',
  imports:
    [
      ContainerHeaderInfoPedidosComponent,
      ContainerInfoPedidoComponent,
      ContainerFormPedidoComponent,
    ],
  templateUrl: './container-form-admin-pedidos.component.html',
  styleUrl: './container-form-admin-pedidos.component.css'
})
export class ContainerFormAdminPedidosComponent {

}

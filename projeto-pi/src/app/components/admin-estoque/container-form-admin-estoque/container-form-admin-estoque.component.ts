import { Component } from '@angular/core';
import { ContainerHeaderInfoPedidosComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-header-info-pedidos/container-header-info-pedidos.component";
import { ContainerInfoEstoqueComponent } from './container-info-estoque/container-info-estoque.component';
import { ContainerFormEstoqueComponent } from './container-form-estoque/container-form-modal-estoque.component';
import { ContainerFormModalPedidoComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-form-modal-pedido/container-form-modal-pedido.component";

@Component({
  selector: 'app-container-form-admin-estoque',
  imports: [ContainerHeaderInfoPedidosComponent, ContainerInfoEstoqueComponent, ContainerFormEstoqueComponent],
  templateUrl: './container-form-admin-estoque.component.html',
  styleUrl: './container-form-admin-estoque.component.css'
})
export class ContainerFormAdminEstoqueComponent {

}

import { Component } from '@angular/core';
import { ContainerHeaderInfoPedidosComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-header-info-pedidos/container-header-info-pedidos.component";
import { ContainerInfoEstoqueComponent } from './container-info-estoque/container-info-estoque.component';
import { ContainerFormModalEstoqueComponent } from './container-form-modal-estoque/container-form-modal-estoque.component';
import { ContainerFormModalPedidoComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-form-modal-pedido/container-form-modal-pedido.component";
import { ContainerFormEstoqueDashboardComponent } from "./container-form-estoque-dashboard/container-form-estoque-dashboard.component";

@Component({
  selector: 'app-container-form-admin-estoque',
  imports: [ContainerHeaderInfoPedidosComponent, ContainerInfoEstoqueComponent, ContainerFormEstoqueDashboardComponent],
  templateUrl: './container-form-admin-estoque.component.html',
  styleUrl: './container-form-admin-estoque.component.css'
})
export class ContainerFormAdminEstoqueComponent {




  
}

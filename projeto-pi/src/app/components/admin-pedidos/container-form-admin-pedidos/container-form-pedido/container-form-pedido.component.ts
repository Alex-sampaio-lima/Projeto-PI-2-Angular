import { Component, inject, OnInit } from '@angular/core';
import { Pedido } from '../../pedido';
import { PedidoService } from '../../pedido.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../container-form-modal-pedido/container-form-modal-pedido.component';

@Component({
  selector: 'app-container-form-pedido',
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './container-form-pedido.component.html',
  styleUrl: './container-form-pedido.component.css'
})

export class ContainerFormPedidoComponent implements OnInit {
  private listarPedidosService = inject(PedidoService);

  constructor(public dialog: MatDialog, public pedidoService: PedidoService) { }

  pedidos: Pedido[] = [];
  clientes: any[] = [];

  listarPedidos() {
    this.listarPedidosService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    })
  }

  ngOnInit(): void {
    this.listarPedidos();
  }

  openDialog(): void {
    console.log("O modal foi Aberto");

    const dialogRef = this.dialog.open(ContainerFormModalPedidoComponent, {
      width: '800px', height: '1220px', maxWidth: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("O modal foi fechado !")
    })
  }
}

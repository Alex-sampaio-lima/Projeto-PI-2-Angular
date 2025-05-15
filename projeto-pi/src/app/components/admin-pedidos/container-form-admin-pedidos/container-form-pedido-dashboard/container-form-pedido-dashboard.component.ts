import { Component, inject, OnInit } from '@angular/core';
import { Pedido } from '../../../../../interfaces/pedido';
import { PedidoService } from '../../../../../services/pedido.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../container-form-modal-pedido/container-form-modal-pedido.component';
import { Cliente } from '../../../../../interfaces/user';

@Component({
  selector: 'app-container-form-pedido-dashboard',
  imports: [HttpClientModule, FormsModule, CommonModule, ContainerFormModalPedidoComponent],
  templateUrl: './container-form-pedido-dashboard.component.html',
  styleUrl: './container-form-pedido-dashboard.component.css'
})

export class ContainerFormPedidoDashBoardComponent implements OnInit {
  private pedidoService = inject(PedidoService);

  constructor(public dialog: MatDialog) { }

  clientes: Cliente[] = [];
  pedidos: Pedido[] = [];
  verificaAtualizaPedido = false;
  modalVisible = false;

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    })
  }

  verificarAtualizacaoPedidoForm(id: number): boolean {
    this.pedidoService.idPedido = id;
    this.openModal();
    this.pedidoService.vericaAtualizacaoPedido = true;
    return this.pedidoService.vericaAtualizacaoPedido;
  }

  excluirPedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe({
      next: () => {
        console.log('Pedido excluido com sucesso !');
        this.listarPedidos();
      },
      error: (err) => {
        console.error('Erro ao excluir pedido', err);
      }
    });
    this.listarPedidos();
  }

  openModal(): void {
    console.log("O modal foi Aberto");
    this.modalVisible = true;
    this.pedidoService.vericaAtualizacaoPedido = false;
  }
}

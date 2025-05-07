import { Component, inject, OnInit } from '@angular/core';
import { Pedido } from '../../../../../interfaces/pedido';
import { PedidoService } from '../../../../../services/pedido.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../container-form-modal-pedido/container-form-modal-pedido.component';

@Component({
  selector: 'app-container-form-pedido',
  imports: [HttpClientModule, FormsModule, CommonModule, ContainerFormModalPedidoComponent],
  templateUrl: './container-form-pedido.component.html',
  styleUrl: './container-form-pedido.component.css'
})

export class ContainerFormPedidoComponent implements OnInit {
  private pedidosService = inject(PedidoService);

  constructor(public dialog: MatDialog, public pedidoService: PedidoService) { }

  clientes: any[] = [];
  pedidos: Pedido[] = [];
  verificaAtualizaPedido = false;
  modalVisible = false;

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidosService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    })
  }

  verificarAtualizacaoPedidoForm(id: number): boolean {
    this.pedidoService.idPedido = id;
    this.openModal();
    this.pedidosService.vericaAtualizacao = true;
    return this.pedidosService.vericaAtualizacao;
  }

  excluirPedido(id: number): void {
    this.pedidosService.deletePedido(id).subscribe({
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
    this.pedidosService.vericaAtualizacao = false;
    // const dialogRef = this.dialog.open(ContainerFormModalPedidoComponent, {
    //   width: '800px', height: '1220px', maxWidth: '100%'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("O modal foi fechado !")
    //   this.listarPedidos();
    //   console.log("Antes" + this.pedidosService.vericaAtualizacao);

    //   this.pedidosService.vericaAtualizacao = false;
    // })
  }
}

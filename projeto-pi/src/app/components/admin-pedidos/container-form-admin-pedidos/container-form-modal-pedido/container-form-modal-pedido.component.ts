import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from '../../pedido.service';
import { Pedido } from '../../pedido';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-container-form-modal-pedido',
  imports: [FormsModule],
  templateUrl: './container-form-modal-pedido.component.html',
  styleUrl: './container-form-modal-pedido.component.css'
})

export class ContainerFormModalPedidoComponent implements OnInit {
  private criarPedidosService = inject(PedidoService);
  private listarPedidosService = inject(PedidoService);


  constructor(public dialogRef: MatDialog) { }


  pedido = signal<Omit<Pedido, 'id' | 'created_at' | 'updated_at'>>({
    tipo_pedido: '',
    forma_pagamento: '',
    valor_total: 0,
    status: '',
    observacoes: '',
    cliente_id: 0,
  })

  ngOnInit(): void { }

  criarPedido() {
    this.criarPedidosService.postPedido(this.pedido()).subscribe({
      next: (response) => {
        console.log(`Pedido criado: ${response}`);
        this.listarPedidosService.getAllPedidos();
        this.resetForm();
      },
      error(error) {
        console.error("Erro ao criar pedido", error);
        alert('Erro ao criar o pedido');
      },
    })
  }

  resetForm() {
    this.pedido.set({
      tipo_pedido: '',
      forma_pagamento: '',
      valor_total: 0,
      status: '',
      observacoes: '',
      cliente_id: 0,
    })
  }


  // postPedidos(event: any) {
  //   console.log(event)
  // }

  onNoClick(): void {
    this.dialogRef.closeAll();
  }
}

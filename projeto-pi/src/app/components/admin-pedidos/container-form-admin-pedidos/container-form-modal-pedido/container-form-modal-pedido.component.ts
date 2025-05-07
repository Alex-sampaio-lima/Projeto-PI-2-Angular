import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../../../../services/pedido.service';
import { Pedido } from '../../../../../interfaces/pedido';
import { FormsModule } from '@angular/forms';
import { ContainerFormPedidoDashBoardComponent } from '../container-form-pedido-dashboard/container-form-pedido-dashboard.component';


@Component({
  selector: 'app-container-form-modal-pedido',
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './container-form-modal-pedido.component.html',
  styleUrl: './container-form-modal-pedido.component.css'
})

export class ContainerFormModalPedidoComponent implements OnInit {
  public pedidosService = inject(PedidoService);


  constructor(public dialogRef: MatDialog) { }

  pedidos: Pedido[] = [];

  pedido = <Omit<Pedido, 'id' | 'created_at' | 'updated_at' | 'cliente_id'>>({
    tipo_pedido: '',
    forma_pagamento: '',
    valor_total: null,
    status: '',
    observacoes: '',
  })

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  @Output() pedidoCriado = new EventEmitter<void>();

  ngOnInit(): void {
    this.listarPedidos();
  }

  @HostListener('document:keydown.escape', ['$event'])

  onEscKey(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidosService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    })
  }

  criarPedido() {
    this.pedidosService.postPedido(this.pedido).subscribe({
      next: (response) => {
        console.log(`Pedido criado: ${response}`);
        this.pedidoCriado.emit();
        this.listarPedidos();
        this.resetForm();
        this.onClose(); // Fecha o Modal ao criar o pedido
      },
      error(error) {
        console.error("Erro ao criar pedido", error);
        alert('Erro ao criar o pedido');
      },
    });
  }

  atualizar() {
    this.close.emit();
    this.pedidoCriado.emit();
    this.resetForm();
  }

  atualizarPedido(id: number, campo: string, valor: any) {
    console.log("Entrou no Atualizar");

    if (this.pedidosService.vericaAtualizacao) {

      this.pedidosService.updatePedido(id, campo, valor).subscribe({
        next: (response) => {
          console.log(`${campo} atualizado com sucesso !`);
        },
        error: (err) => console.error(`Erro ao atualizar ${campo}:`, err)
      });

    } else {
      console.error(`O id: ${id} não foi fornecido !`);

    }
  }

  resetForm() {
    this.pedido = {
      tipo_pedido: '',
      forma_pagamento: '',
      valor_total: null,
      status: '',
      observacoes: '',
    };
  }
  // onNoClick(): void {

  //   // postPedidos(event: any) {
  //   //   console.log(event)
  //   // }
  //   this.dialogRef.closeAll();
  // }
}
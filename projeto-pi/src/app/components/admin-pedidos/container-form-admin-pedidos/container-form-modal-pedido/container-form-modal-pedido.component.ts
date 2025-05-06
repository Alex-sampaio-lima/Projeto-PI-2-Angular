import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../../../../services/pedido.service';
import { Pedido } from '../../../../../interfaces/pedido';
import { FormsModule } from '@angular/forms';
import { ContainerFormPedidoComponent } from '../container-form-pedido/container-form-pedido.component';


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

  pedido = <Omit<Pedido, 'id' | 'created_at' | 'updated_at'>>({
    tipo_pedido: '',
    forma_pagamento: '',
    status: '',
    observacoes: '',
  })


  ngOnInit(): void {
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

      },
      error(error) {
        console.error("Erro ao criar pedido", error);
        alert('Erro ao criar o pedido');
      },
    });
  }


  atualizar() {
    this.dialogRef.closeAll();
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


  onNoClick(): void {
    // resetForm() {
    //   this.pedido = {
    //     tipo_pedido: '',
    //     forma_pagamento: '',
    //     valor_total: 0,
    //     status: '',
    //     observacoes: '',
    //     cliente_id: 0,
    //   };
    // }


    // postPedidos(event: any) {
    //   console.log(event)
    // }
    this.dialogRef.closeAll();
  }
}

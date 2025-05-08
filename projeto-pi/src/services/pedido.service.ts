import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PedidoService implements OnInit {

  urlPedido = 'http://localhost:3000/pedidos';
  pedidoForm: FormGroup | undefined;
  idPedido = 0;
  vericaAtualizacaoPedido = false;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { };

  ngOnInit(): void {
    this.getAllPedidos();

    this.pedidoForm = this.fb.group({
      tipo_pedido: ['', [Validators.required]],
      forma_pagamento: ['', [Validators.required]],
      valor_total: ['', [Validators.required]],
      status: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    });
  };

  getAllPedidos() {
    return this.httpClient.get<Pedido[]>(this.urlPedido);
  };

  postPedido(pedido: Omit<Pedido, 'id' | 'created_at' | 'updated_at' | 'cliente_id'>): Observable<Pedido> {
    const pedidoCompleto = {
      ...pedido,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    console.log('Payload sendo enviado:', pedidoCompleto);
    return this.httpClient.post<Pedido>(this.urlPedido, pedidoCompleto);
  };

  updatePedido(id: number, campo: string, valor: number | string): Observable<Pedido> {
    const updateData = {
      ...this.pedidoForm,
      updated_at: new Date().toLocaleString(),
      [campo]: valor
    };
    return this.httpClient.patch<Pedido>(`${this.urlPedido}/${id}`, updateData);
  };

  deletePedido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlPedido}/${id}`);
  };


};

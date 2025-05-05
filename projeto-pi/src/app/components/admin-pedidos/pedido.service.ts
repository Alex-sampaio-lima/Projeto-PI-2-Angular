import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './pedido';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PedidoService implements OnInit {

  apiUrl = 'http://localhost:3000/pedidos';

  pedidoForm: FormGroup | undefined;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }
  public resultado: number = 0;

  ngOnInit(): void {
    this.getAllPedidos();

    this.pedidoForm = this.fb.group({
      tipo_pedido: ['', [Validators.required]],
      forma_pagamento: ['', [Validators.required]],
      valor_total: ['', [Validators.required]],
      status: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    })
  }

  getAllPedidos() {
    return this.httpClient.get<Pedido[]>(this.apiUrl);
  }

  incrementaId(): number {
    let novoId: number = 0;
    const pedido = this.httpClient.get<Pedido[]>(this.apiUrl).subscribe({
      next: (pedidos) => {
        const ultimaPos = pedidos.length - 1;
        // let ultimoID = pedidos[ultimaPos].id;
        // console.log("Id Atual", ultimoID);
        // novoId = ultimoID + 1;
        console.log("Novo Id: " + novoId);
        this.resultado = novoId;
      }
    });
    console.log("SE PASSAR AQUI DEU CERTO", this.resultado);

    return this.resultado;
  }

  // postPedido(pedido: Omit<Pedido, 'id' | 'created_at' | 'updated_at'>): Observable<Pedido> {

  idSoma = 0;

  postPedido(pedido: Omit<Pedido, 'id' | 'created_at' | 'updated_at'>): Observable<Pedido> {
    console.log(this.idSoma);
    this.idSoma += 1;
    const pedidoCompleto = {
      ...pedido,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    console.log("Depois",)
    console.log('Payload sendo enviado:', pedidoCompleto);

    return this.httpClient.post<Pedido>(this.apiUrl, pedidoCompleto);
  }







};

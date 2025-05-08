import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoque } from '../interfaces/estoque';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private httpClient: HttpClient) { }
  urlEstoque = 'http://localhost:3000/estoque'
  verificaAtualizacaoEstoque = false;
  idEstoque: number = 0;
  estoqueForm = ({});
  itensEmEstoque: Array<Estoque> = [];
  itensEmBaixoEstoque: Array<Estoque> = [];

  verificarItensEstoque(data: Observable<Estoque[]>) {
    data.subscribe(dataEstoque => {
      this.itensEmEstoque = dataEstoque.filter((item) => item.id != 0);
      console.log(this.itensEmEstoque.length);
    });
  };

  verificarItensBaixoEstoque(data: Observable<Estoque[]>) {
    console.log("Entrou aqui la ele!");
    data.subscribe(dataEstoque => {
      this.itensEmBaixoEstoque = dataEstoque.filter(item => item.quantidade !== null && item.quantidade <= 5);
      console.info(this.itensEmBaixoEstoque);
    });
  };]
  
  getAllEstoque() {
    let data: Observable<Estoque[]>;
    data = this.httpClient.get<Estoque[]>(this.urlEstoque);
    this.verificarItensEstoque(data);
    this.verificarItensBaixoEstoque(data);
    return data;
  };

  postEstoque(estoque: Omit<Estoque, 'id' | 'created_at' | 'updated_at'>): Observable<Estoque> {
    const estoqueCompleto = {
      ...estoque,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    console.log('Payload sendo enviado:', estoqueCompleto);
    return this.httpClient.post<Estoque>(this.urlEstoque, estoqueCompleto);
  };

  updateEstoque(id: number, campo: string, valor: number | string): Observable<Estoque> {
    const updateData = {
      ...this.estoqueForm,
      updated_at: new Date().toLocaleString(),
      [campo]: valor
    };
    return this.httpClient.patch<Estoque>(`${this.urlEstoque}/${id}`, updateData);
  };

  deletePedido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlEstoque}/${id}`);
  };
};

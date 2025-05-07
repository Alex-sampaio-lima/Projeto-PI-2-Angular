import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoque } from '../interfaces/estoque';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlEstoque = 'http://localhost:3000/estoque'
  constructor(private httpClient: HttpClient) { }

  estoqueForm = ({

  });


  getAllEstoque() {
    return this.httpClient.get<Estoque[]>(this.urlEstoque);
  }

  postEstoque(estoque: Omit<Estoque, 'id'>): Observable<Estoque> {
    const estoqueCompleto = {
      ...estoque,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    console.log('Payload sendo enviado:', estoqueCompleto);
    return this.httpClient.post<Estoque>(this.urlEstoque, estoqueCompleto);
  }

  updateEstoque(id: number, campo: string, valor: number | string): Observable<Estoque> {
    const updateData = {
      ...this.estoqueForm,
      updated_at: new Date().toLocaleString(),
      [campo]: valor
    }
    return this.httpClient.patch<Estoque>(`${this.urlEstoque}/${id}`, updateData);
  }

  deletePedido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlEstoque}/${id}`);
  }
}

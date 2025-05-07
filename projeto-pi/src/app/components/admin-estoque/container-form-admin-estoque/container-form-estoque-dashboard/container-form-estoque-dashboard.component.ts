import { Component } from '@angular/core';
import { ContainerFormModalEstoqueComponent } from '../container-form-modal-estoque/container-form-modal-estoque.component';
import { Estoque } from '../../../../../interfaces/estoque';

@Component({
  selector: 'app-container-form-estoque-dashboard',
  imports: [ContainerFormModalEstoqueComponent],
  templateUrl: './container-form-estoque-dashboard.component.html',
  styleUrl: './container-form-estoque-dashboard.component.css'
})
export class ContainerFormEstoqueDashboardComponent {


  modalVisible = false;

  estoque: Estoque[] = [];










  excluirEstoque(id: number): void {

  }

  verificarAtualizacaoEstoqueForm(id: number) {

  }


  openModal() {
    this.modalVisible = true;
    
  }
}

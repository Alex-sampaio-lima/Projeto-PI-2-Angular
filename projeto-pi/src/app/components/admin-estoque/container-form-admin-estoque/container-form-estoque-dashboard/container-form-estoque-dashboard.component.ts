import { Component, inject, OnInit } from '@angular/core';
import { ContainerFormModalEstoqueComponent } from '../container-form-modal-estoque/container-form-modal-estoque.component';
import { Estoque } from '../../../../../interfaces/estoque';
import { EstoqueService } from '../../../../../services/estoque.service';

@Component({
  selector: 'app-container-form-estoque-dashboard',
  imports: [ContainerFormModalEstoqueComponent],
  templateUrl: './container-form-estoque-dashboard.component.html',
  styleUrl: './container-form-estoque-dashboard.component.css'
})
export class ContainerFormEstoqueDashboardComponent implements OnInit {

  public estoqueService = inject(EstoqueService);
  modalVisible = false;
  estoqueData: Estoque[] = [];

  ngOnInit(): void {
    this.listarEstoque();
  };

  openModal() {
    this.modalVisible = true;
    this.estoqueService.verificaAtualizacaoEstoque = false;
  };

  itensEmEstoque = 0;

  listarEstoque(): void {
    this.estoqueService.getAllEstoque().subscribe((data: Estoque[]) => {
      this.estoqueData = data;
      console.log("DATA: ", data);

    });
  };

  calcularItensEstoque() {
    this.estoqueData.forEach(item => {
      if (item.id != 0) {
        // this.itensEmEstoque += 1;
      };
    });
  };


  excluirEstoque(id: number): void {
    this.estoqueService.deletePedido(id).subscribe({
      next: () => {
        console.log('Item do Estoque excluido com sucesso !');
        this.listarEstoque();
      },
      error(e) {
        console.log(`Erro ao excluir o pedido ${e}`);
      }
    })
  }

  verificarAtualizacaoEstoqueForm(id: number) {
    this.estoqueService.verificaAtualizacaoEstoque = true;
    this.modalVisible = true;
    this.estoqueService.idEstoque = id;
  }

};

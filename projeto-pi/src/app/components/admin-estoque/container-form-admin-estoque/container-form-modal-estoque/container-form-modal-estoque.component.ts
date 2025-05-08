import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estoque } from '../../../../../interfaces/estoque';
import { EstoqueService } from '../../../../../services/estoque.service';

@Component({
  selector: 'app-container-modal-form-estoque',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './container-form-modal-estoque.component.html',
  styleUrl: './container-form-modal-estoque.component.css',
})
export class ContainerFormModalEstoqueComponent implements OnInit {

  public estoqueService = inject(EstoqueService);

  estoqueData: Estoque[] = [];

  estoque = <Omit<Estoque, 'id' | 'created_at' | 'updated_at'>>({
    nome_produto: '',
    tipo_produto: '',
    quantidade: null,
    custo_unitario: null,
    unidade_medida: '',
    observacoes: ''
  });

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() estoqueCriado = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
      this.resetForm();
    };
  };

  ngOnInit(): void {
    this.listarEstoque();
  };

  listarEstoque() {
    this.estoqueService.getAllEstoque().subscribe((data: Estoque[]) => {
      this.estoqueData = data;
    });
  };

  criarEstoque() {
    this.estoqueService.postEstoque(this.estoque).subscribe({
      next: (response) => {
        console.log(`Estoque criado: ${response}`);
        this.estoqueCriado.emit();
        this.resetForm();
      },
      error(e) {
        console.error(`Erro ao criar estoque: ${e}`);
      }
    });
  };

  atualizar() {
    this.close.emit();
    this.estoqueCriado.emit();
    this.resetForm();
  };



  atualizarEstoque(id: number, campo: string, valor: any) {
    console.log("Entrou no atualizar");

    if (this.estoqueService.verificaAtualizacaoEstoque) {
      this.estoqueService.updateEstoque(id, campo, valor).subscribe({
        next: (response) => {
          console.log(`${campo} atualiazdo com sucesso !`);
          this.estoqueCriado.emit();
        },
        error(e) {
          console.error(`Erro ao atualizar o campo ${campo}\nErro: ${e}`);
        }
      });
    };
  };

  onClose() {
    this.close.emit();
    this.resetForm();
  };

  resetForm() {
    this.estoque = {
      nome_produto: '',
      tipo_produto: '',
      quantidade: null,
      custo_unitario: null,
      observacoes: '',
      unidade_medida: ''
    };
  };

};

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
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Estoque, EstoqueUpdate } from '../../../../../interfaces/estoque';
import { EstoqueService } from '../../../../../services/estoque.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-container-modal-form-estoque',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-form-modal-estoque.component.html',
  styleUrl: './container-form-modal-estoque.component.css',
})
export class ContainerFormModalEstoqueComponent implements OnInit {

  public estoqueService = inject(EstoqueService);
  group: any;

  constructor(private fb: FormBuilder) { }

  estoqueForm!: FormGroup;
  originalEstoque!: Estoque;

  estoqueData: Estoque[] = [];
  estoque = <Omit<Estoque, 'id' | 'created_at' | 'updated_at'>>({
    nome_produto: '',
    tipo_produto: '',
    quantidade: 0,
    custo_unitario: 0,
    unidade_medida: '',
    observacoes: ''
  });

  estoqueID: EstoqueUpdate | undefined;

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
    this.listarEstoquePorID();
    this.estoqueForm = this.fb.group({
      nome_produto: [''],
      tipo_produto: [''],
      quantidade: [''],
      custo_unitario: [''],
      unidade_medida: [''],
      observacoes: ['']
    });

  };

  listarEstoque() {
    this.estoqueService.getAllEstoque().subscribe((data: Estoque[]) => {
      this.estoqueData = data;
    });
  };

  listarEstoquePorID() {
    this.estoqueService.getEstoqueById(this.estoqueService.idEstoque).subscribe({
      next: (data: any) => {
        this.estoque = data;
        this.resetForm();
        console.log('Dados do estoque por ID', data);
      },
      error(e) {
        console.error('Erro ao buscar estoque por ID', e);
      }
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


    // const valores = this.estoqueForm.value;
    // const atualizacoes: Partial<Estoque> = {};

    // for (const key in valores) {
    //   if (valores[key] !== (this.originalEstoque as any)[key]) {
    //     atualizacoes[key as keyof Estoque] = valores[key];
    //   }
    // }

    // if (Object.keys(atualizacoes).length == 0) {
    //   console.log('Nenhum campo alterado.');
    //   return;
    // }

    // if (this.estoqueService.verificaAtualizacaoEstoque) {
    //   this.estoqueService.updateEstoque(this.estoqueService.idEstoque, this.estoque).subscribe({
    //     next: (res) => {
    //       console.log('Estoque atualizar com sucesso !', res);
    //     },
    //     error: (e) => {
    //       console.error('Erro ao atualizar o estoque', e);
    //     }
    //   });
    // };
    this.close.emit();
    this.estoqueCriado.emit();
    this.listarEstoquePorID();
    this.resetForm();
  };
  campoTeste = '';
  valor: any;

  atualizarEstoque(id: number) {
    console.log("Entrou no atualizar");
    console.log(this.estoque);
    console.log(this.campoTeste);
    console.log(this.valor);


    if (this.estoqueService.verificaAtualizacaoEstoque) {
      this.estoqueService.updateEstoque(id, this.campoTeste, this.valor).subscribe({
        next: (response) => {
          console.log(`${this.campoTeste} atualiazdo com sucesso !`);
          this.estoqueCriado.emit();
        },
        error: (e) => {
          console.error(`Erro ao atualizar o campo ${this.campoTeste}\nErro: ${e}`);
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
      quantidade: 0,
      custo_unitario: 0,
      observacoes: '',
      unidade_medida: ''
    };
  };

};

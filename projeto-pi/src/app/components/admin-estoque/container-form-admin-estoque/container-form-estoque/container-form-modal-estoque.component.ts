import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-container-modal-form-estoque',
  imports: [FormsModule, CommonModule],
  templateUrl: './container-form-modal-estoque.component.html',
  styleUrl: './container-form-modal-estoque.component.css'
})
export class ContainerFormEstoqueComponent implements OnInit {


  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  @Output() estoqueCriado = new EventEmitter<void>();

  ngOnInit(): void {

  }

  onClose() {
    this.close.emit();
  }



}

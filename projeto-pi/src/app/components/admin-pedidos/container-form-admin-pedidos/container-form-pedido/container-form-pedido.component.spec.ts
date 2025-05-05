import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormPedidoComponent } from './container-form-pedido.component';

describe('ContainerFormPedidoComponent', () => {
  let component: ContainerFormPedidoComponent;
  let fixture: ComponentFixture<ContainerFormPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

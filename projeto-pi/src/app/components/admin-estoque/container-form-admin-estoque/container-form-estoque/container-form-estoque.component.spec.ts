import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormEstoqueComponent } from './container-form-estoque.component';

describe('ContainerFormEstoqueComponent', () => {
  let component: ContainerFormEstoqueComponent;
  let fixture: ComponentFixture<ContainerFormEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

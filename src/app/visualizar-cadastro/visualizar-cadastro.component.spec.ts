import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCadastroComponent } from './visualizar-cadastro.component';

describe('VisualizarCadastroComponent', () => {
  let component: VisualizarCadastroComponent;
  let fixture: ComponentFixture<VisualizarCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

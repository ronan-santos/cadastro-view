import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirCadastroComponent } from './incluir-cadastro.component';

describe('IncluirCadastroComponent', () => {
  let component: IncluirCadastroComponent;
  let fixture: ComponentFixture<IncluirCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluirCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

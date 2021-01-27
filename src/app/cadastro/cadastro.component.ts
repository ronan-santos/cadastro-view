import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cadastro } from '../shared/dominios/cadastro';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  @Input() cadastro: Cadastro;
  @Input() isVisualizar: boolean = false;
  @Output() salvar= new EventEmitter<Cadastro>();

  cadastroForm:FormGroup;
  dadosCompletos: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   
    if(this.cadastro == null|| this.cadastro == undefined ){
      this.cadastro = {} as Cadastro;
    }

    this.iniciarFormFroup(this.cadastro);
    this.dadosCompletos = true;

  }

  atualizarValorDocumento(){

    this.documento.reset();
    this.nascimento.reset();
    this.identidade.reset();
  }


  adicionarTelefone(){

    this.telefones.push(this.fb.control(''));
  }

  removerTelefone(index){
    this.telefones.removeAt(index);
  }

  iniciarFormFroup(cadastro: Cadastro){
 
    this.cadastroForm = this.fb.group({
      id: new FormControl(cadastro.id),
      nome: new FormControl(cadastro.nome,  Validators.required),
      tipoDocumento: new FormControl(cadastro.tipoDocumento, Validators.required),
      documento: new FormControl(cadastro.documento,Validators.required),
      nascimento: new FormControl(cadastro.nascimento,Validators.required),
      identidade: new FormControl(cadastro.identidade, Validators.required),
      telefones: this.fb.array([this.fb.control('')])

    });

  }

  salvarContato(){

    this.salvar.emit(this.cadastroForm.value);

  }
  get telefones(): FormArray{

    return this.cadastroForm.get('telefones') as FormArray;
  }

  get nome(): FormControl{
    return this.cadastroForm.get('nome') as FormControl;
  }

  get tipoDocumento(): FormControl {
    return this.cadastroForm.get('tipoDocumento') as FormControl;

  }

  get documento(): FormControl {
    return this.cadastroForm.get('documento') as FormControl;

  }

  get identidade(): FormControl {
    return this.cadastroForm.get('identidade') as FormControl;

  }

  get nascimento(): FormControl {
    return this.cadastroForm.get('nascimento') as FormControl;

  }



}

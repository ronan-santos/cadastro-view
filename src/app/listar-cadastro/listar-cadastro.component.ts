import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cadastro } from '../shared/dominios/cadastro';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CadastroServiceService } from '../shared/servicos/cadastro-service.service';
import { Subscription, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listar-cadastro',
  templateUrl: './listar-cadastro.component.html',
  styleUrls: ['./listar-cadastro.component.css']
})
export class ListarCadastroComponent implements OnInit, OnDestroy {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private service: CadastroServiceService, 
              private router: Router,private toastr: ToastrService ) { }

  colunas: string[] = ['ID','NOME','DOCUMENTO', 'ACAO'];
  datasource: MatTableDataSource<Cadastro>;
  dados: Cadastro[];
  subscriptions: Subscription = new Subscription();
  informacoesCarregadas: boolean = false
  


  ngOnInit(): void {

    this.iniciarDadosConsulta();
    this.iniciarFormulario();
  }

  ngOnDestroy(): void{

    this.subscriptions.unsubscribe();
  }

  limpar(){

    this.formulario.reset();
  }

  pesquisarCadastros(){

    let nome = this.formulario.get('nome').value;
    let documento = this.formulario.get('documento').value;
    
    if((nome != null && nome != undefined)
        || (documento != null && documento != undefined)){
          this.informacoesCarregadas = false;
          this.subscriptions.add(
          this.service
                .consultarCadastrosPorFiltro(nome,documento)
                .pipe(
                  tap(),
                  catchError(erro => { return this.verificarErro(erro) })
                )
                .subscribe(data => {
                  this.dados = data
                  this.datasource = new MatTableDataSource(this.dados);
                  this.informacoesCarregadas = true;
                }));
        }else{

          this.toastr.warning('Ao menos um item deve ser informado para a pesquisa')
        }
  }

  iniciarDadosConsulta(){
    this.subscriptions.add(
      this.service
          .consultarCadastros()
            .pipe(
              tap(),
              catchError(erro => { return this.verificarErro(erro) })
            )
            .subscribe(data => {
              this.dados = data
              this.datasource = new MatTableDataSource(this.dados);
              this.informacoesCarregadas = true;
            })

    )
  }

  verificarErro(erro){
    if(erro.status == 500){

      this.toastr.warning('Ocorreu um erro ao processar a sua solicitação.')
    }else{
      this.toastr.warning(erro.error);
    }
    this.informacoesCarregadas = true;
    return throwError(erro);
  }

  iniciarFormulario(){

    this.formulario = this.fb.group({
      nome: new FormControl(),
      tipoDocumento: new FormControl(),
      documento: new FormControl()
    })
  }

  visualizarCadastro(id){

    this.router.navigate(['visualizar',id])
  }

  alterarCadastro(id){
    this.router.navigate(['alterar',id])
  }



}

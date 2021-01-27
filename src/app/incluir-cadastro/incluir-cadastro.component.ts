import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cadastro } from '../shared/dominios/cadastro';
import { CadastroServiceService } from '../shared/servicos/cadastro-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incluir-cadastro',
  templateUrl: './incluir-cadastro.component.html',
  styleUrls: ['./incluir-cadastro.component.css']
})
export class IncluirCadastroComponent implements OnInit, OnDestroy {

cadastro: Cadastro;
subscription: Subscription = new Subscription();
retornoServidor: boolean = false;

  constructor( private service: CadastroServiceService,
               private toastr: ToastrService,
               private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    debugger;
    let idCadastro = this.route.snapshot.paramMap.get('id');

    if(idCadastro != null || idCadastro != undefined){
      this.consultarCadastro(idCadastro);
    }else{
      this.retornoServidor = true;
      
    }
    
  }

  consultarCadastro(idCadastro){
    
    this.subscription
          .add(  this.service
                        .consultarCadastroPor(idCadastro)
                          .pipe(

                           tap(),
                            catchError(erro => { return this.verificarErro(erro) } )

                          )
                          .subscribe(data => {  
                            this.retornoServidor = true;
                            this.cadastro = data  }) )



  }

  

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  verificarErro(erro){
  
    if(erro.status == 500){

      this.toastr.warning('Ocorreu um erro ao processar a sua solicitação.')
    }else{
      this.toastr.warning(erro.error);
    }
    
    this.retornoServidor = true;
    return throwError(erro);
  }

  salvarCadastro(cad:Cadastro){
   
    this.retornoServidor = false;
    this.subscription
          .add(
            this.service
                  .salvarCadastro(cad)
                    .pipe(
                      tap(),
                      catchError(erro => {return this.verificarErro(erro)})
                    )
                    .subscribe(()=> { this.retornoServidor = true;
                                         this.toastr.success('Operação realizada com sucesso.')  }));

   }
}

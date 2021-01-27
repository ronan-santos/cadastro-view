import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../shared/dominios/cadastro';
import { CadastroServiceService } from '../shared/servicos/cadastro-service.service';
import { Subscription, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar-cadastro',
  templateUrl: './visualizar-cadastro.component.html',
  styleUrls: ['./visualizar-cadastro.component.css']
})
export class VisualizarCadastroComponent implements OnInit, OnDestroy {

  cadastro: Cadastro = {} as Cadastro;
  subscription: Subscription = new Subscription();
  retornoServidor: boolean = false;

  constructor(private route: ActivatedRoute,
             private service: CadastroServiceService, private toastr: ToastrService) {


   }

  ngOnInit(): void {

    let idCadastro = this.route.snapshot.paramMap.get('id');

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

  verificarErro(erro){
    this.toastr.warning(erro.error);
    this.retornoServidor = true;
    return throwError(erro);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}

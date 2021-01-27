import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from '../dominios/cadastro';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {



  constructor(private http: HttpClient) { }

  consultarCadastros():Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(`${environment.apiUrl}`+'cadastro');
  }

  consultarCadastroPor(id): Observable<Cadastro>{

    return this.http.get<Cadastro>(`${environment.apiUrl}`+'cadastro/'+id);
  }

  salvarCadastro(cadastro): Observable<Cadastro>{
    return this.http.post<Cadastro>(`${environment.apiUrl}`+'cadastro/',cadastro);
  }

  consultarCadastrosPorFiltro(nome, documento){

    let parametros = 
    { params: new HttpParams().set('nome', nome != null ? nome : "" )
                              .set('documento',documento != null ? documento : "" ) }

    return this.http.get<Cadastro[]>(`${environment.apiUrl}`+'cadastro/pesquisa',parametros);

  }
}

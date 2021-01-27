import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponent } from './shared/shared.component';
import { SharedModule } from './shared/shared.module';

import { CadastroComponent } from './cadastro/cadastro.component';
import { IncluirCadastroComponent } from './incluir-cadastro/incluir-cadastro.component';
import { VisualizarCadastroComponent } from './visualizar-cadastro/visualizar-cadastro.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

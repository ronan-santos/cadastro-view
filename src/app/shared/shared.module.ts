import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { CadastroComponent } from '../cadastro/cadastro.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ListarCadastroComponent } from '../listar-cadastro/listar-cadastro.component';
import {MatTableModule} from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { IncluirCadastroComponent } from '../incluir-cadastro/incluir-cadastro.component';
import { VisualizarCadastroComponent } from '../visualizar-cadastro/visualizar-cadastro.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';






export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const rotas: Routes = [

  {path: 'incluir',component:IncluirCadastroComponent},
  {path: 'alterar/:id',component: IncluirCadastroComponent},
  {path: 'visualizar/:id',component:VisualizarCadastroComponent},
  {path: 'listar',component:ListarCadastroComponent},
  {path:'', redirectTo:'listar',pathMatch:'full'}
];

@NgModule({
  declarations: [CadastroComponent,ListarCadastroComponent,
    IncluirCadastroComponent,
    VisualizarCadastroComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatRadioModule,
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forRoot(rotas,{enableTracing:true}),
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    
  ],
  providers:[MatDatepickerModule,MatNativeDateModule],
  exports:[CadastroComponent,ListarCadastroComponent,RouterModule, MatCardModule,FlexLayoutModule]
})
export class SharedModule { }

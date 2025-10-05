import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    UpdateComponent,
    PageLoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild([
            { path: 'list', component: ListComponent },
            { path: 'add', component: AddComponent },
            { path: 'update/:id', component: AddComponent },
        ])
  ],
  providers: [MessageService,DialogService],
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    
  ],
})
export class SharedModule {}

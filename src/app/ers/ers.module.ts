import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonStringifyPipe } from './pipes/json-stringify.pipe';



@NgModule({
  declarations: [
JsonStringifyPipe],
  imports: [
    CommonModule
  ]
})
export class ErsModule { }

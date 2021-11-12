import {Component, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {PageHeaderComponent} from './components/page-header/page-header.component';

@NgModule({
  declarations: [AppComponent, PageHeaderComponent, CalculatorComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NeuronComponent } from './neuron/neuron.component';
import { ConnectionComponent } from './connection/connection.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSignalComponent } from './input-signal/input-signal.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from'@angular/material/icon'
import { MatDialogModule } from'@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NeuronComponent,
    ConnectionComponent,
    InputSignalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

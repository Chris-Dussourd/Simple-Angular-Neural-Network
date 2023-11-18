import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Part1Network } from './part1network/part1network.component';

const routes: Routes = [
  { path: 'part1', component: Part1Network }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [Part1Network]

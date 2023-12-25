import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Part1Network } from './part1-network/part1-network.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Part2Network } from './part2-network/part2-network.component';
import { Part3Network } from './part3-network/part3-network.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'part1', component: Part1Network },
  { path: 'part2', component: Part2Network },
  { path: 'part3', component: Part3Network },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  PageNotFoundComponent,
  Part1Network,
  Part2Network,
  Part3Network
]

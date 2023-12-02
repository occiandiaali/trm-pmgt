import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesListComponent } from './rides-list/rides-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'rides', pathMatch: 'full'},
  {path: 'rides', component: RidesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

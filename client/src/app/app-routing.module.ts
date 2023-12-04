import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesListComponent } from './rides-list/rides-list.component';
import { AddRideComponent } from './add-ride/add-ride.component';
import { EditRideComponent } from './edit-ride/edit-ride.component';

const routes: Routes = [
  {path: '', redirectTo: 'rides', pathMatch: 'full'},
  {path: 'rides', component: RidesListComponent},
  {path: 'rides/new', component: AddRideComponent},
  {path: 'rides/edit/:id', component: EditRideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

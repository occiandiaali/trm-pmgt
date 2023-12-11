import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesListComponent } from './rides-list/rides-list.component';
import { AddRideComponent } from './add-ride/add-ride.component';
import { EditRideComponent } from './edit-ride/edit-ride.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { MembersComponent } from './members/members.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // {path: '', redirectTo: 'rides', pathMatch: 'full'},
  // {path: 'rides', component: RidesListComponent},
  // {path: 'rides/new', component: AddRideComponent},
  // {path: 'rides/edit/:id', component: EditRideComponent}
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'members', component: MembersComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

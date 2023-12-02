import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RidesListComponent } from './rides-list/rides-list.component';
import { RideFormComponent } from './ride-form/ride-form.component';
import { AddRideComponent } from './add-ride/add-ride.component';

@NgModule({
  declarations: [
    AppComponent,
    RidesListComponent,
    RideFormComponent,
    AddRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

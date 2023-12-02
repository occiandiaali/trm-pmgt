import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from '../ride';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-add-ride',
  template: `
  <h2 class="text-center m-5">Add a New Employee</h2>
  <app-ride-form (formSubmitted)="addRide($event)"></app-ride-form>
  `,
  styles: [
  ]
})
export class AddRideComponent {
  constructor(
    private router: Router,
    private rideService: RideService
  ) { }
  
  addRide(ride: Ride) {
    this.rideService.createRide(ride)
      .subscribe({
        next: () => {
          this.router.navigate(['/rides']);
        },
        error: (error) => {
          alert("Failed to create ride");
          console.error(error);
        }
      });
  }
}

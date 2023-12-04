import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ride } from '../ride';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-edit-ride',
  template: `
  <h2 class="text-center m-5">Edit an Entry</h2>
  <app-ride-form [initialState]="ride" (formSubmitted)="editRide($event)"></app-ride-form>
  `,
  styles: [
  ]
})
export class EditRideComponent implements OnInit {
  ride: BehaviorSubject<Ride> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rideService: RideService,
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.rideService.getRide(id !).subscribe((ride) => {
      this.ride.next(ride);
    });
  }
  
  editRide(ride: Ride) {
    this.rideService.updateRide(this.ride.value._id || '', ride)
      .subscribe({
        next: () => {
          this.router.navigate(['/rides']);
        },
        error: (error) => {
          alert('Failed to update ride entry');
          console.error(error);
        }
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../ride';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-rides-list',
  template: `
  <h2 class="text-3xl">Ride Rentals</h2>
 
  <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Year</th>
              <th>Cost/Day</th>
              <th>Available</th>
          </tr>
      </thead>

      <tbody>
          <tr *ngFor="let ride of rides$ | async">
              <td>{{ride.name}}</td>
              <td>{{ride.model}}</td>
              <td>{{ride.year}}</td>
              <td>{{ride.cost}}</td>
              <td>{{ride.available}}</td>
              <td>
                  <button class="btn btn-primary me-1" [routerLink]="['edit/', ride._id]">Edit</button>
                  <button class="btn btn-danger" (click)="deleteRide(ride._id || '')">Delete</button>
              </td>
          </tr>
      </tbody>
  </table>

  <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Ride</button>
  `,
  styles: [
  ]
})
export class RidesListComponent implements OnInit {
  rides$: Observable<Ride[]> = new Observable();

  constructor(private ridesService: RideService) { }

  ngOnInit(): void {
    this.fetchRides();
  }

  deleteRide(id: string): void {
    if (window.confirm("Are you sure you want to delete this? \n This action cannot be undone.")) {
      this.ridesService.deleteRide(id).subscribe({
        next: () => this.fetchRides()
      });
    }
    return;
  }

  private fetchRides(): void {
    this.rides$ = this.ridesService.getRides();
  }
}

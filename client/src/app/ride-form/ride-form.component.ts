import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Ride } from '../ride';

@Component({
  selector: 'app-ride-form',
  template: `
  <form class="ride-form" autocomplete="off" [formGroup]="rideForm" (ngSubmit)="submitForm()">
  <div class="form-floating mb-3">
    <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
    <label for="name">Name</label>
  </div>

  <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
    <div *ngIf="name.errors?.['required']">
      Name is required.
    </div>
    <div *ngIf="name.errors?.['minlength']">
      Name must be at least 3 characters long.
    </div>
  </div>

  <div class="form-floating mb-3">
    <input class="form-control" type="text" formControlName="model" placeholder="Model" required>
    <label for="model">Model</label>
  </div>

  <div *ngIf="model.invalid && (model.dirty || model.touched)" class="alert alert-danger">

    <div *ngIf="model.errors?.['required']">
      Model is required.
    </div>
    <div *ngIf="model.errors?.['minlength']">
      Model must be at least 3 characters long.
    </div>
  </div>

  <div class="form-floating mb-3">
  <input class="form-control" type="text" id="year" formControlName="year" placeholder="Year" required>
  <label for="year">Year</label>
</div>

<div *ngIf="year.invalid && (year.dirty || year.touched)" class="alert alert-danger">
  <div *ngIf="year.errors?.['required']">
    Year is required.
  </div>
</div>

<div class="form-floating mb-3">
<input class="form-control" type="text" id="cost" formControlName="cost" placeholder="Cost" required>
<label for="cost">Cost/Day</label>
</div>

<div *ngIf="cost.invalid && (cost.dirty || cost.touched)" class="alert alert-danger">
<div *ngIf="cost.errors?.['required']">
  Cost/Day is required.
</div>
</div>

  <div class="mb-3">
    <div class="form-check">
      <input class="form-check-input" type="radio" formControlName="available" name="available" id="available-yes" value="yes" required>
      <label class="form-check-label" for="available-yes">Yes</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" formControlName="available" name="available" id="available-no" value="no">
      <label class="form-check-label" for="available-no">No</label>
    </div>
  </div>

  <button class="btn btn-primary" type="submit" [disabled]="rideForm.invalid">Add</button>
</form>
  `,
  styles: [
    `
    .ride-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    `
  ]
})
export class RideFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Ride> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<Ride>();
  
  @Output()
  formSubmitted = new EventEmitter<Ride>();
  
  rideForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get name() { return this.rideForm.get('name')!; }
  get model() { return this.rideForm.get('model')!; }
  get year() { return this.rideForm.get('year')!; }
  get cost() { return this.rideForm.get('cost')!; }
  get available() { return this.rideForm.get('available')!; }
  
  ngOnInit() {
    this.initialState.subscribe(ride => {
      this.rideForm = this.fb.group({
        name: [ ride.name, [Validators.required] ],
        model: [ ride.model, [ Validators.required, Validators.minLength(3) ] ],
        year: [ ride.year, [Validators.required] ],
        cost: [ ride.cost, [Validators.required] ],
        available: [ ride.available, [Validators.required] ],
      });
    });
  
    this.rideForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    this.formSubmitted.emit(this.rideForm.value);
  }
}

import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Team } from './team';
import { TeamService } from './team.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-team',
    template: `
  <h2 class="text-center m-5">New Team</h2>
  <form class="team-form" autocomplete="off" [formGroup]="teamForm" (ngSubmit)="submitForm()">
  <div class="form-floating mb-3">
  <label for="name">Name</label>
    <input class="form-control border border-slate-400 rounded-md p-2 w-full" type="text" id="name" formControlName="name" placeholder="Name" required>
  </div>

  <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
    <div *ngIf="name.errors?.['required']">
      Name is required.
    </div>
    <div *ngIf="name.errors?.['minlength']">
      Name must be at least 3 characters long.
    </div>
  </div>

  <button class="btn btn-primary" type="submit" [disabled]="teamForm.invalid">Add</button>
  <button class="btn btn-warning ms-4" [routerLink]="['']">Back</button>
</form>
  `,
    styles: [
        `
        .team-form {
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        `
    ],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class AddTeamComponent implements OnInit {
    @Input()
    initialState: BehaviorSubject<Team> = new BehaviorSubject<Team>({ name: '', members: [], projects: [] });

    @Output()
    formValuesChanged = new EventEmitter<Team>();

    @Output()
    formSubmitted = new EventEmitter<Team>();

    teamForm: FormGroup = new FormGroup({});

    constructor(
        private router: Router,
        private teamService: TeamService,
        private fb: FormBuilder
    ) { }

    get name() { return this.teamForm.get('name')!; }

    addTeam(team: Team) {
        this.teamService.createTeam(team)
            .subscribe({
                next: () => {
                    this.router.navigate(['/teams']);
                },
                error: (error) => {
                    alert("Failed to create team");
                    console.error(error);
                }
            });
    }

    ngOnInit(): void {
        this.initialState.subscribe(team => {
            this.teamForm = this.fb.group({
                name: [team.name, [Validators.required]]
            })
        })

        this.teamForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); })
    }

    submitForm() {
        this.formSubmitted.emit(this.teamForm.value);
    }
}

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
    <div class="mt-10">
    <h2 class="text-center mt-3 mb-6 text-2xl font-semibold">New Team</h2>
    <form class="team-form" autocomplete="off" [formGroup]="teamForm" (ngSubmit)="submitForm()">
    <div class="form-floating mb-3">
    <label for="name" class="mb-6 text-lg">Team Name</label>
      <input class="form-control mt-6 border border-slate-400 rounded-md p-2 w-full" type="text" id="name" formControlName="name" placeholder="Name" required>
    </div>
  
    <div *ngIf="name.invalid && (name.dirty || name.touched)" class=" text-red-600">
      <div *ngIf="name.errors?.['required']">
        Name is required.
      </div>
      <div *ngIf="name.errors?.['minlength']">
        Name must be at least 3 characters long.
      </div>
    </div>

    <div class="form-floating mb-8">
    <label for="description" class="mb-6 text-lg">Team Description</label>
    <textarea class="form-control mt-6 border border-slate-400 rounded-md p-2 w-full" rows="2" cols="40" formControlName="description" placeholder="Describe the team's purpose.." id="description"></textarea>
    </div>  
    <button class="w-20 h-10 border rounded-full bg-green-800 text-white" type="submit" [disabled]="teamForm.invalid" (click)="doThat()">Add</button>
    <button class="w-20 h-10 border rounded-full ms-4 bg-red-800 text-white" [routerLink]="['']">Cancel</button>
  </form>
    </div>
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
  /*
      <div class="mb-12 w-50 h-12 pt-2 border border-slate-400 rounded-md">
    <label for="cars">Invite members:</label>

    <select name="members" id="members">
    <option value=""></option>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    </div>

        <label for="members" class="mb-6 font-semibold">Add recommended members</label>
    <div class="mb-4 mt-2 grid grid-rows-2 grid-flow-col gap-1">
        <div class="form-check mr-2">
        <input class="form-check-input" type="checkbox" formControlName="Bobo-Mohammed" name="Bobo-Mohammed" id="Bobo-Mohammed" value="Bobo Mohammed">
        <label class="form-check-label" for="Bobo-Mohammed"> Bobo Mohammed</label>
      </div>
      <div class="form-check mr-2">
      <input class="form-check-input" type="checkbox" formControlName="Jane Thomas" name="Jane Thomas" id="Jane-Thomas" value="Jane Thomas">
      <label class="form-check-label" for="Jane-Thomas"> Jane Thomas</label>
    </div>
        <div class="form-check mr-2">
          <input class="form-check-input" type="checkbox" formControlName="level1" name="level1" id="level-junior1" value="junior1">
          <label class="form-check-label" for="level-junior1"> Apple MacAhmed</label>
        </div>
        <div class="form-check mr-2">
        <input class="form-check-input" type="checkbox" formControlName="level2" name="level2" id="level-junior2" value="junior2">
        <label class="form-check-label" for="level-junior2"> Bobo Mohammed</label>
      </div>
      <div class="form-check mr-2">
      <input class="form-check-input" type="checkbox" formControlName="level3" name="level3" id="level-junior3" value="junior3">
      <label class="form-check-label" for="level-junior3"> Jane Thomas</label>
    </div>
<div class="form-check mr-2">
<input class="form-check-input" type="checkbox" formControlName="level4" name="level4" id="level-junior4" value="junior4">
<label class="form-check-label" for="level-junior4"> Olaolu Brown</label>
</div>

  </div>
   */
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
  get description() { return this.teamForm.get('description')!; }

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
        name: [team.name, [Validators.required]],
        description: team.description
      })
    })

    this.teamForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); })
  }

  doThat() { // "That is AddTeam"
    this.addTeam(this.teamForm.value)
  }

  submitForm() {
    this.formSubmitted.emit(this.teamForm.value);
  }
}

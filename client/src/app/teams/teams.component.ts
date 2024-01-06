import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Observable } from 'rxjs';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog'
import { Team } from './team';
import { TeamService } from './team.service';
import { RouterLink } from '@angular/router';

export interface DialogData {
    name: string;
    description?: string;
}

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormsModule, DialogModule, NgFor, NgIf, CommonModule, RouterLink]
})
export class TeamsComponent implements OnInit {
    // teams = ['X-team', 'Support', 'Product Design', 'Backend']
    teams$: Observable<Team[]> = new Observable()
    // projects = ['X-team', 'Support', 'Product Design', 'Backend'];
    projects = [];
    today = new Date();

    projectName = "";
    projectDescription = "";

    constructor(public dialog: Dialog, private teamsService: TeamService) { }

    openDialog(): void {
        const dialogRef = this.dialog.open<string>(AddProjectDialog, {
            width: '250px',
            data: { name: this.projectName, info: this.projectDescription }
        });
        dialogRef.closed.subscribe(result => {
            console.log('Modal closed..');
            this.projectName = result || "";
        })
    }

    private fetchTeams(): void {
        this.teams$ = this.teamsService.getTeams()
    }

    ngOnInit(): void {
        this.fetchTeams()
    }

    deleteTeam(id: string): void {
        this.teamsService.deleteTeam(id).subscribe({
            next: () => this.fetchTeams()
        })
    }

    showModal() {
        alert('Modal Shown..')
    }

}

@Component({
    selector: 'add-project-dialog',
    template: `
    <div class="h-2/3 w-full p-3">
  <label class="text-sm" for="project-name">What do you call this Project?</label>
  <input id="project-name" [(ngModel)]="data.name" placeholder="Project name">
  <br/>
  <label class="text-sm" for="project-info">How do you describe the Project?</label>
  <textarea id="project-info" name="description" rows="3" cols="20" placeholder="Project description"></textarea>
  <br/>
  <label class="text-sm" for="project-members">Who do you want on the Project?</label>
  <select name="pets" id="pet-select">
  <option value="">--Recommended members--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
</div>
<div>
  <button class="w-20 h-10 border rounded-full bg-green-800 text-white" (click)="dialogRef.close(data.name)">OK</button>
  <button class="w-20 h-10 border rounded-full ms-4 bg-red-800 text-white" (click)="dialogRef.close()">Cancel</button>
</div>
    `,
    styles: [`
    :host {
        display: block;
        background: #fff;
        border-radius: 8px;
        padding: 8px 16px 16px;
      }
      
      input {
        margin: 8px 0;
      }
      
      button+button {
        margin-left: 8px;
      }
    `],
    standalone: true,
    imports: [FormsModule]
})
export class AddProjectDialog {
    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA) public data: DialogData
    ) { }
}
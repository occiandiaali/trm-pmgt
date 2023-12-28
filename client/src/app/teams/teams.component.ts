import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team';
import { TeamService } from './team.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [NgFor, NgIf, CommonModule, RouterLink]
})
export class TeamsComponent implements OnInit {
    // teams = ['X-team', 'Support', 'Product Design', 'Backend']

    teams$: Observable<Team[]> = new Observable()
    projects = ['X-team', 'Support', 'Product Design', 'Backend'];
    //projects = [];
    today = new Date();

    constructor(private teamsService: TeamService) { }

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

}
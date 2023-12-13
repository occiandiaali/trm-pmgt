import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { Team } from './team';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private url = 'http://localhost:5200';
    private teams$: Subject<Team[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshTeams() {
        this.httpClient.get<Team[]>(`${this.url}/teams`)
            .subscribe(teams => {
                this.teams$.next(teams);
            });
    }

    getTeams(): Subject<Team[]> {
        this.refreshTeams();
        return this.teams$;
    }

    getTeam(id: string): Observable<Team> {
        return this.httpClient.get<Team>(`${this.url}/teams/${id}`);
    }

    createTeam(team: Team): Observable<string> {
        return this.httpClient.post(`${this.url}/teams`, team, { responseType: 'text' });
    }

    updateTeam(id: string, team: Team): Observable<string> {
        return this.httpClient.put(`${this.url}/teams/${id}`, team, { responseType: 'text' });
    }

    deleteTeam(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/teams/${id}`, { responseType: 'text' });
    }
}

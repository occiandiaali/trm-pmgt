import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Ride } from './ride';
 
@Injectable({
 providedIn: 'root'
})
export class RideService {
 private url = 'http://localhost:5200';
 private rides$: Subject<Ride[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshRides() {
   this.httpClient.get<Ride[]>(`${this.url}/rides`)
     .subscribe(rides => {
       this.rides$.next(rides);
     });
 }
 
 getRides(): Subject<Ride[]> {
   this.refreshRides();
   return this.rides$;
 }
 
 getRide(id: string): Observable<Ride> {
   return this.httpClient.get<Ride>(`${this.url}/rides/${id}`);
 }
 
 createRide(ride: Ride): Observable<string> {
   return this.httpClient.post(`${this.url}/rides`, ride, { responseType: 'text' });
 }
 
 updateRide(id: string, ride: Ride): Observable<string> {
   return this.httpClient.put(`${this.url}/rides/${id}`, ride, { responseType: 'text' });
 }
 
 deleteRide(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/rides/${id}`, { responseType: 'text' });
 }
}

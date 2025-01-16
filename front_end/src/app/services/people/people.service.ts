import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { People } from '../../models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  private _baseUrl = `${API_CONFIG.baseUrl}/user`;

  findById(id: any): Observable<People> {
    return this.http.get<People>(`${this._baseUrl}/find/${id}`)
  }

  findAll(): Observable<People[]> {
    return this.http.get<People[]>(`${this._baseUrl}/findAll`);
  }

  create(people: People): Observable<void> {
    return this.http.post<void>(`${this._baseUrl}/create`, people);
  }

  update(people: People): Observable<void> {
    return this.http.put<void>(`${this._baseUrl}/update/${people._id}`, people);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/delete/${id}`)
  }

  generateReport(camp: string): Observable<Blob> {
    return this.http.get<Blob>(`${this._baseUrl}/report/${camp}`, { responseType: 'blob' as 'json' });
  }
}

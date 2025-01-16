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
    return this.http.get<People[]>(`${this._baseUrl}/getAll`);
  }

  create(people: People): Observable<People> {
    return this.http.post<People>(`${this._baseUrl}/create`, people);
  }

  update(people: People): Observable<People> {
    return this.http.put<People>(`${this._baseUrl}/update/${people.id}`, people);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/delete/${id}`)
  }
}

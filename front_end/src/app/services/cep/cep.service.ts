import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  private _baseUrl = "https://viacep.com.br/ws";

  findCep(cep: string): Observable<{ estado: string; localidade: string }> {
    return this.http.get<any>(`${this._baseUrl}/${cep}/json`).pipe(
      map((response) => {
        return {
          estado: response.estado || response.uf,
          localidade: response.localidade,
        };
      })
    );
  }
}

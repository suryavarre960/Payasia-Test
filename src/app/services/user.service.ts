import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../Common/iusers';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  getEmployeeList(): Observable<UserData> {
    return this._http.get<UserData>('https://jsonplaceholder.typicode.com/users');
  }

}

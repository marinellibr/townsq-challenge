import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User>{
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + userId);
  }
}

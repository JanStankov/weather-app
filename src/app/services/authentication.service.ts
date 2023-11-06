import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/Response/LoginResponse';
import { CreateUserCommand } from '../models/Commands/CreateUserCommand';
import { RegisterResponse } from '../models/Response/RegisterResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = `http://localhost:5001/authentication`;
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, {
      email,
      password
    })
  }

  public register(newUser: CreateUserCommand): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${this.baseUrl}/register`, newUser)
  }
}

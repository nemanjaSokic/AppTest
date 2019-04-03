import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import * as JWTDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const auth = {
      email:email,
      password:password
    };
    return this.http.post<{token: string}>(`${this.uri}/api/auth`, auth)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate([`/login`]);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  getAccountIdFromToken(){
    let token = localStorage.getItem('access_token');
    if (token == null) return null;
    let decodedToken = this.getDecodedAccessToken(token);
    return decodedToken.userID;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return JWTDecode(token);
    }
    catch(Error){
        return null;
    }
  }
}
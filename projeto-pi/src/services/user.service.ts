import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SafeUser, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/user';
  private isAuthenticated = false;
  userLocalStorage: string | null = '';

  public currentUser: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
    nome: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<User[]>(`${this.userUrl}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users && users.length > 0) {
          this.isAuthenticated = true;
          this.currentUser = users[0];
          const safeUser = this.sanitizeUser(users[0]);
          localStorage.setItem('@currentUser', JSON.stringify(safeUser));
        };
      }),
      catchError(error => {
        console.error('Erro ao realizar login:', error);
        return of(null); // Esse of aqui, ele cria um Observable para retornar um null em vez de retornar um null diretamente, para seguir o fluxo normal do código
      })
    );
  };

  isLoggedIn(): boolean {
    let verifica = false;
    if (this.isAuthenticated) {
      verifica = true;
    };
    return verifica;
  };

  isLoggedInAdmin(): boolean {
    let verifica = false;
    this.userLocalStorage = localStorage.getItem('@currentUser');
    if (this.isAuthenticated == true && this.currentUser.isAdmin == true && this.userLocalStorage != null) {
      verifica = true;
    }
    return verifica;
  };

  logOut(): void {
    this.isAuthenticated = false;
    this.currentUser = {
      nome: '',
      email: '',
      password: '',
      isAdmin: false,
    };
    localStorage.removeItem('@currentUser');
    this.router.navigate(['/login']);
  };

  sanitizeUser(user: User): SafeUser {
    return {
      nome: user.nome,
      email: user.email,
      created_at: user.created_at
    }
  }
};



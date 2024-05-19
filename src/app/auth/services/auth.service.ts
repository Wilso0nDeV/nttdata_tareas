import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/interfaces';
import { Usuario } from '../../core/models';
import { v4 as uuidv4 } from 'uuid';
import { LocalService } from '../../shared/services/local-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: Usuario;
  constructor(
    private store: Store<AppState>,

    private localService: LocalService
  ) {}

  loginUser(usuario: string, contrasena: string): Observable<Usuario> {
    let user = new Usuario('', '', '');
    if (contrasena == 'test01' && usuario == 'test01') {
      user.id = uuidv4();
      user.usuario = usuario;
      user.contrasena = contrasena;
      user.token = uuidv4() + usuario;
      this.localService.setJsonValue('token', `${user.token}`);
      this.localService.setJsonValue('user', JSON.stringify(user));
      return of(user);
    } else {
      return of(user);
    }
  }
  checkAuthentication(): Observable<boolean> {
    const token: string = localStorage.getItem('token')!;

    return of(token).pipe(
      map((token) => {
        if (token) {
          return true;
        }
        return false;
      }),
      catchError((err) => of(false))
    );
  }
}

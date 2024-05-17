import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/interfaces';
import { Usuario } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: Usuario;
  constructor(
    private store : Store<AppState>

  ) { }

  checkAuthentication(): Observable<boolean> {


    return this.store.select('usuario')
      .pipe(
        tap( user => this.user = user ),
        map( user => {
            if(user.contrasena !== 'test01' ||  user.usuario !== 'test01'){
               return false
            }
            return  true
        } ),
        catchError( err => of(false) )
      );

  }
}

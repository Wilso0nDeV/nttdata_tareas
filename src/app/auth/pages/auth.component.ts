import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../core/interfaces';
import { Usuario } from '../../core/models';
import { loginUsuario } from '../../core/ngrx/usuario/usuario.actions';
import { RefreshValid } from '../../shared/util';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  newTaskDescription: string = '';
  menssage: string = 'Datos incorrectos';
  validateMessage!: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private query: ActivatedRoute
  ) {
    this.formLogin = new FormGroup({
      usuario: new FormControl(null, [Validators.required]),
      contrasena: new FormControl(null, [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    
  }

  sendLogin() {
    this.query.queryParams.subscribe((params) => {
      console.log(params['auth'])
      this.validateMessage = params['auth'] === 'false' ? true : false;
    });

    const { value, valid } = this.formLogin;
    if (valid &&  this.validateMessage ) {
        const user: Usuario = new Usuario(value.usuario, value.contrasena);
        this.store.dispatch(loginUsuario(user));

        this.router.navigate(['/tareas']);
      
    } else {
      RefreshValid(this.formLogin);
    }

    setTimeout(() => {
      this.validateMessage = false;
    }, 2000);
  }
}

import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { loginUsuario } from './usuario.actions';

export const initialState : Usuario = new Usuario('','')

export const _usuarioReducer = createReducer(
  initialState,
  on(loginUsuario, (state,{usuario,contrasena}) => {
    return {
      ...state,
      usuario,
      contrasena
    }
  })
)

export const usuarioReducer = (state: any, action: any) =>{
    return _usuarioReducer(state, action)

}
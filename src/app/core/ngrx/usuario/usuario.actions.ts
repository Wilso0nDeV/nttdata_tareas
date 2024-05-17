import { createAction, props } from "@ngrx/store";


export const loginUsuario = createAction(
    '[Usuario] Login usuario',
    props<{usuario:string , contrasena : string} >()
);


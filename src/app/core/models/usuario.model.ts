import { v4 as uuidv4 } from 'uuid';

export class Usuario { 
    public id : string;
    public usuario : string; 
    public contrasena : string;

    constructor(usuario:string,contrasena:string){
        this.id = uuidv4();
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
}
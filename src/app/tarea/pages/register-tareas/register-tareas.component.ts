import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/interfaces';
import  * as actions  from '../../../core/ngrx/tareas/tarea.actions';
import { Usuario } from '../../../core/models';

@Component({
  selector: 'app-register-tareas',
  templateUrl: './register-tareas.component.html',
  styleUrls: ['./register-tareas.component.scss']
})
export class RegisterTareasComponent implements OnInit {
 
  formTarea : FormGroup
  menssage : string = ""
  validateMessage : boolean = false

  usuario! : Usuario
  constructor(
    private store : Store<AppState>
  ){
    this.formTarea = new FormGroup({
      description: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
      
    });
    
  }
  ngOnInit(): void {
    this.getUser()
  }
 

  sendTarea(){

    this.validForm()
    const { value } = this.formTarea;
    this.store.dispatch(actions.crearTarea({description: value.description }))
    this.validateMessage = true
    this.menssage = "Se registro correctamente"
    this.formTarea.reset();


    setTimeout(()=>{
      this.validateMessage = false
    },2000)
  }


  getUser(){

    this.store.select('usuario').subscribe(user => this.usuario = user );

    
  }

  validForm(){
    if(this.formTarea.invalid) { return }
  }


}

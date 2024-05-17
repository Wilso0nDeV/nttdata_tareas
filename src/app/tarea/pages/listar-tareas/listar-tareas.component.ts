import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/interfaces';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Tarea } from '../../../core/models';
import  * as actions  from '../../../core/ngrx/tareas/tarea.actions';


@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.scss']
})
export class ListarTareasComponent implements OnInit {

  tareas : Tarea[] = [];
  faTrash = faTrash;
  txtDescription! : FormControl;
  constructor(
    private store : Store<AppState>
  ){}
  ngOnInit(): void {
  
    this.store.select('tarea')
    .subscribe(tareas => this.tareas = tareas );

  }

  onCompleted(tarea : Tarea){
    //const checkbox  = event.target as HTMLInputElement;
    const id = tarea.id
    this.store.dispatch(actions.completedTarea({id}))

  }

  onDeleted(tarea : Tarea){
    //const checkbox  = event.target as HTMLInputElement;
    const id = tarea.id
    this.store.dispatch(actions.deletedTarea({id}))

  }

  
}

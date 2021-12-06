import { DialogData } from './dialog.model';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html',
})
export class DialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}




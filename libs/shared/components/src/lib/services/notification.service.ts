import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  duration = 3000;

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message:string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: this.duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}

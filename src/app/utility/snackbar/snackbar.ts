
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.css']
})
export class SnackbarComponent {
  @Input() errorMessage: string = '';
}

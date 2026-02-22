import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NgForm, FormsModule} from '@angular/forms';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.css'],
   standalone: true,
   imports: [FormsModule]
})
export class CreateTaskComponent {
  @Input() isEditMode: boolean = false;

  @Input() selectedTask!: Task | any;

  @ViewChild('taskForm') taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  ngAfterViewInit(){
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);
    
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm){
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }
}
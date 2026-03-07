import { Component, OnInit, inject} from '@angular/core';
import { NgClass, CommonModule} from '@angular/common';
import { Task } from '../Models/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../Services/task.service';
import { Subscription } from 'rxjs';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AuthService } from '../Services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  standalone:true,
  imports: [CreateTaskComponent, TaskDetailsComponent, NgClass, CommonModule]
})
export class DashboardComponent implements OnInit{
  showCreateTaskForm: boolean = false;
  showTaskDetails: boolean = false;
  http: HttpClient = inject(HttpClient)
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);
  currentTaskId: string | undefined = '';
  currentTask: Task | null | any = null;
  errorMessage: string | null = null;
  editMode: boolean = false;
  selectedTask!: Task | undefined;
  errorSub!: Subscription
  isLoading:boolean = false;

   constructor(private authService: AuthService){}
  ngOnInit(){
    this.fetchAllTasks();
    this.errorSub = this.taskService.errorSubject.subscribe({next: (httpError) => {
      this.setErrorMessage(httpError);
    }})
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: ''}
  }

  showCurrentTaskDetails(id: string | undefined){
    this.showTaskDetails = true;
    this.taskService.getTaskDetails(id).subscribe((data: Task) => {
      this.currentTask = data;
    });
  }

  CloseTaskDetails(){
    this.showTaskDetails = false;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task){
    if(!this.editMode)
      this.taskService.CreateTask(data);
    else
      this.taskService.UpdateTask(this.currentTaskId, data);
  }

  FetchAllTaskClicked(){
    this.fetchAllTasks()
  }

  private fetchAllTasks(){
    this.authService.user.subscribe((res)=>{
      console.log(res);
    })
    this.isLoading = true;
    this.taskService.GetAlltasks().subscribe({next: (tasks) => {
      console.log(tasks)
      if(tasks){
        this.allTasks = tasks;
        console.log(this.allTasks)
      }
      this.isLoading = false;
    }, error: (error) => {
      this.isLoading = false;
      this.setErrorMessage(error);
    }})
  }

  private setErrorMessage(err: HttpErrorResponse){
    if(err.error.error === 'Permission denied'){
      this.errorMessage = 'You do not have permisssion to perform this action';
    }
    else{
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  DeleteTask(id: string | undefined){
    this.taskService.DeleteTask(id);
  }

  DeleteAllTask(){
    this.taskService.DeleteAllTasks();
  }

  OnEditTaskClicked(id: string | undefined){
    this.currentTaskId = id;
    
    //OPEN EDIT TASK FORM
    this.showCreateTaskForm = true;
    this.editMode = true;

    this.selectedTask = this.allTasks.find((task) => {return task.id === id})
  }
}
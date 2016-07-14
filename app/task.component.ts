import { Component } from '@angular/core';
import { Task } from './task'
import { TaskService } from './task.service'
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'partials/task.component.html',
  styleUrls: ['partials/task.component.css'],
  providers: [TaskService]

})
export class TaskComponent implements OnInit{
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  getTasks() {
    this.taskService.getTasks().then(tasks => this.tasks = tasks);
  }

  ngOnInit() {
   this.getTasks();
   this.timeHandler();
 }

 addTask() {
   let taskName = document.getElementById("task-input").value;
   for(let i = 0; i < this.tasks.length; i++){
     if(this.tasks[i].name === taskName){
       setTimeout(function() { alert('this name exists already!'); }, 1);
       return;
     }
   }
   this.tasks.push({name: taskName, state: "toDo", timeInSec: 0});
   document.getElementById("task-input").value = '';
 }

 deleteTask(currentTask: Task) {
   for(let i = 0; i < this.tasks.length; i++){
     if(this.tasks[i] === currentTask){
       this.tasks.splice(i,1)
       break;
     }
   }
 }

 endTask(currentTask: Task) {
   currentTask.state = 'done';
   currentTask.stopped = true;
 }

 timeHandler() {
  let timer = setInterval(() => {
    for(let i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].state === "inProgress" && this.tasks[i].stopped === false){
        this.tasks[i].timeInSec++;
        this.tasks[i].timeInSec.toHHMMSS();// toHHMMSS() is a number portotype -> js/main.js
      }
  }, 1000)
}

startTimer(currentTask: Task) {
  for(let i = 0; i < this.tasks.length; i++){
    if(this.tasks[i].stopped === false && (currentTask.state !== "inProgress" || currentTask.stopped === true  )){
      setTimeout(function() { alert('other task is running already'); }, 1);
      return;
    }
  }
  currentTask.state = "inProgress";
  currentTask.stopped = false;
  console.log(currentTask.parentNode);
}

  stopTimer(currentTask: Task) {
    currentTask.stopped = true;
}

  resetTimer(currentTask: Task) {
    currentTask.timeInSec = 0;
    currentTask.stopped = true;
  }

clearTable(e) {

  function isTableEmpty(arr, e) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].state === e.target.id) {
        return false;
      }
    }
    return true;
  }

  for(let i = 0; i < this.tasks.length; i++){ //
    if(e.target.id === this.tasks[i].state){  //   1.Search for tasks, that has state equal to button's id
      if(isTableEmpty(this.tasks, e)) {        //   2.If there is nothing to search for,
        return;                               //     escape from function
      }                                       //
      this.tasks.splice(i,1);                 //  3.Remove task
      this.clearTable(e);                      //  4.Start searching for another tasks
    }
  }
}

}

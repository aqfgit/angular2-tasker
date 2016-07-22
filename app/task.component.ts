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
    this.timerHandler();
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
    this.tasks.forEach((t: Task) => {
      if(t === currentTask) {
        this.tasks.splice(this.tasks.indexOf(t), 1);
      }
    });
   }

  endTask(currentTask: Task) {
    currentTask.state = 'done';
    currentTask.stopped = true;
   }

  timerHandler() {
    let timer = setInterval(() => {
      this.tasks.forEach((t: Task) => {
          if(t.state === 'inProgress' && t.stopped === false) {
            t.timeInSec++;
          }
      });
    }, 1000)
  }

  startTimer(currentTask: Task) {
    let shouldReturn;

    this.tasks.forEach((t: Task) => {
      if(t.stopped === false && (currentTask.state !== 'inProgress' || currentTask.stopped === true)) {
        alert('Other task is running already!');
        shouldReturn = true;
      }
    });

    if(shouldReturn) return;

    currentTask.state = "inProgress";
    currentTask.stopped = false;
  }

  stopTimer(currentTask: Task) {
    currentTask.stopped = true;
  }

  resetTimer(currentTask: Task) {
    currentTask.timeInSec = 0;
    currentTask.stopped = true;
  }

  clearTable(e) {
    function doesTaskExists(element, index, array) {
      return array[index].state === e.target.id;
    }

    this.tasks.forEach((t: Task) => {
      if(e.target.id === t.state) {
        if(!(this.tasks.every(doesTaskExists))) {
          return;
        }
        this.tasks.splice(this.tasks.indexOf(t));
        this.clearTable(e);
      }
    });
  }
}

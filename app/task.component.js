"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var task_service_1 = require('./task.service');
var TaskComponent = (function () {
    function TaskComponent(taskService) {
        this.taskService = taskService;
    }
    TaskComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService.getTasks().then(function (tasks) { return _this.tasks = tasks; });
    };
    TaskComponent.prototype.ngOnInit = function () {
        this.getTasks();
        this.timeHandler();
    };
    TaskComponent.prototype.addTask = function () {
        var taskName = document.getElementById("task-input").value;
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].name === taskName) {
                setTimeout(function () { alert('this name exists already!'); }, 1);
                return;
            }
        }
        this.tasks.push({ name: taskName, state: "toDo", timeInSec: 0 });
        document.getElementById("task-input").value = '';
    };
    TaskComponent.prototype.deleteTask = function (currentTask) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i] === currentTask) {
                this.tasks.splice(i, 1);
                break;
            }
        }
    };
    TaskComponent.prototype.endTask = function (currentTask) {
        currentTask.state = 'done';
        currentTask.stopped = true;
    };
    TaskComponent.prototype.timeHandler = function () {
        var _this = this;
        var timer = setInterval(function () {
            for (var i = 0; i < _this.tasks.length; i++) {
                if (_this.tasks[i].state === "inProgress" && _this.tasks[i].stopped === false) {
                    _this.tasks[i].timeInSec++;
                    _this.tasks[i].timeInSec.toHHMMSS();
                }
            }
        }, 1000);
    };
    TaskComponent.prototype.startTimer = function (currentTask) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].stopped === false && (currentTask.state !== "inProgress" || currentTask.stopped === true)) {
                setTimeout(function () { alert('other task is running already'); }, 1);
                return;
            }
        }
        currentTask.state = "inProgress";
        currentTask.stopped = false;
        console.log(currentTask.parentNode);
    };
    TaskComponent.prototype.stopTimer = function (currentTask) {
        currentTask.stopped = true;
    };
    TaskComponent.prototype.resetTimer = function (currentTask) {
        currentTask.timeInSec = 0;
        currentTask.stopped = true;
    };
    TaskComponent.prototype.clearTable = function (e) {
        function isTableEmpty(arr, e) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].state === e.target.id) {
                    return false;
                }
            }
            return true;
        }
        for (var i = 0; i < this.tasks.length; i++) {
            if (e.target.id === this.tasks[i].state) {
                if (isTableEmpty(this.tasks, e)) {
                    return; //     escape from function
                } //
                this.tasks.splice(i, 1); //  3.Remove task
                this.clearTable(e); //  4.Start searching for another tasks
            }
        }
    };
    TaskComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'partials/task.component.html',
            styleUrls: ['partials/task.component.css'],
            providers: [task_service_1.TaskService]
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map
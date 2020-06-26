import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => {
            task.id === id
        });
        if(!task){
            throw new NotFoundException(`Task wiht Id: ${id} not found`);
        }
        
        return task;
    }

    deleteTaskById(id: string): void {
        const task = this.getTaskById(id);

        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
}

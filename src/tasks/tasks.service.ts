import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if(!task){
            throw new NotFoundException(`Task wiht Id: ${id} not found`);
        }

        return task;
    }


    async deleteTaskById(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);

        if(task.affected === 0) {
            throw new NotFoundException(`Task with Id: ${id} not Found`);
        }
    }

    async updateTaskById(id: number, status: TaskStatus): Promise<void> {
        const task = await this.getTaskById(id);
        task.status = status;
        task.save()
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
}

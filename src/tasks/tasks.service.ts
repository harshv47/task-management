import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
=======
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.status.enum';
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
<<<<<<< HEAD

=======
    
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
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

<<<<<<< HEAD
    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task wiht Id: ${id} not found`);
=======

    async deleteTaskById(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);

        if(task.affected === 0) {
            throw new NotFoundException(`Task with Id: ${id} not Found`);
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
        }
    }

    async updateTaskById(id: number, status: TaskStatus): Promise<void> {
        const task = await this.getTaskById(id);
        task.status = status;
<<<<<<< HEAD
        task.save();
    }

    async createTask(createTaskDto: CreateTaskDto) {
=======
        task.save()
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
        return this.taskRepository.createTask(createTaskDto);
    }
}

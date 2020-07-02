import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    
    getTasks(
        filterDto: GetTasksFilterDto,
        user: User,
        ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(
        id: number,
        user: User
        ): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id, userId: user.id }
        });

        if(!task){
            throw new NotFoundException(`Task wiht Id: ${id} not found`);
        }

        return task;
    }


    async deleteTaskById(id: number, user: User): Promise<void> {
        const task = await this.taskRepository.delete({ id, userId: user.id });

        if(task.affected === 0) {
            throw new NotFoundException(`Task with Id: ${id} not Found`);
        }
    }

    async updateTaskById(id: number, status: TaskStatus, user: User): Promise<void> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        task.save()
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
        ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
}

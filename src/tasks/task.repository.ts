import { Repository, EntityRepository } from "typeorm";
<<<<<<< HEAD
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
=======
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { stat } from "fs";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

<<<<<<< HEAD
        if(status) {
            query.andWhere('task.status = :status', { status });
        }
        if(search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%s${search}%` });
        }
=======
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%s${search}%` });
        }
        if(status){
            query.andWhere('task.status = :status', { status });
        }
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5

        const tasks = await query.getMany();
        return tasks;
    }
<<<<<<< HEAD

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        
        return task;
    }
=======
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5
}
import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { stat } from "fs";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('Task Repository');

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
        ): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try{
            await task.save();
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user: ${user.username}, Filters: ${JSON.stringify(createTaskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
        
        delete task.user;

        return task;
    }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User,
        ): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%s${search}%` });
        }
        if(status){
            query.andWhere('task.status = :status', { status });
        }
        try{
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user: ${user.username}, Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
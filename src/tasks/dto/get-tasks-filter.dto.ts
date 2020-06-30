import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
<<<<<<< HEAD
import { TaskStatus } from "../task-status.enum";
=======
import { TaskStatus } from "../task.status.enum";
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
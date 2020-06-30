import { PipeTransform, BadRequestException } from "@nestjs/common";
<<<<<<< HEAD
import { TaskStatus } from "../task-status.enum";
=======
import { TaskStatus } from "../task.status.enum";
>>>>>>> 79698445f51d94831441a21e2259afddcc14d6d5

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value: any): any {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }
}
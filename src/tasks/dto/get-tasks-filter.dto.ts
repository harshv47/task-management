import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @ApiProperty({
        type: String,
        description: 'Status',
    })
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Search',
    })
    search: string;
}
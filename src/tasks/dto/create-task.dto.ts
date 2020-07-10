import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Title',
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Description',
    })
    description: string;
}

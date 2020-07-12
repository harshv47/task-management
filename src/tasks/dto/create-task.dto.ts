import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Title',
        format: 'form',
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Description',
        format: 'form',
    })
    description: string;
}

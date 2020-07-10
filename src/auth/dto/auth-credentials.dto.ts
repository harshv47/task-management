import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        type: String,
        description: 'Username',
    })
    username: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,{
        message: 'Password must contain atleast one Upper case, lowercase and a number'
    })
    @ApiProperty({
        type: String,
        description: 'Password',
    })
    password: string;
}
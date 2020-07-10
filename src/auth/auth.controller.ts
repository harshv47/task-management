import { Controller, Post, Body, ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { ApiResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    @ApiCreatedResponse({
        description: 'User Registered',
    })
    @ApiBody({
        type: AuthCredentialsDto,
    })
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @ApiCreatedResponse({
        description: 'User Logged in',
    })
    @ApiBody({
        type: AuthCredentialsDto,
    })
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }
}

import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiOkResponse, ApiBody, ApiBearerAuth, ApiConsumes, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskCOntroller');

    constructor(private tasksService: TasksService) {}

    @ApiConsumes('application/x-www-form-urlencoded')
    @Get()
    @ApiOkResponse({
        description: 'Returns the task(s)',
    })
    @ApiBearerAuth('JWT')
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User,
        ): Promise<Task[]> {
        this.logger.verbose(`User: "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto, user);
    }

    @ApiConsumes('application/x-www-form-urlencoded')
    @Get('/:id')
    @ApiOkResponse({
        description: 'Returns the task',
    })
    @ApiBadRequestResponse({
        description: 'Task not found',
    })
    @ApiBearerAuth('JWT')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @ApiConsumes('application/x-www-form-urlencoded')
    @Delete('/:id')
    @ApiOkResponse({
        description: 'Deletes the task',
    })
    @ApiBearerAuth('JWT')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise<void> {
        return this.tasksService.deleteTaskById(id, user);
    }

    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch('/:id/status')
    @ApiBearerAuth('JWT')
    updateTaskById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.updateTaskById(id, status, user);
    }

    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    @UsePipes(ValidationPipe)
    @ApiBearerAuth('JWT')
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        ): Promise<Task> {
        this.logger.verbose(`User: "${user.username}" creating a new task. Filters: ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto, user);
    }
}

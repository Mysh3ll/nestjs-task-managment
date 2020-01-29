import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatusById(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }
}

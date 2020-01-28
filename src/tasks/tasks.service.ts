import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from "./task.model";
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);

        return task;
    }

    updateTaskStatusById(id: string, updateTaskDto: UpdateTaskDto): Task {
        const { status } = updateTaskDto;
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
}

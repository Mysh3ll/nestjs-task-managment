import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from "../task.model";

export class UpdateTaskDto {
    @IsNotEmpty()
    status: TaskStatus;
}

import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,

    ];

    transform(value: any) {
        value = value.toUppercase();

        if (!this.isStatusValid(value)) {
            return new BadRequestException(`"${value}" is an invalid status`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const  idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }

}

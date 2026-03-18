import {
    CreateWorkScheduleParams,
    ScheduleRepository,
} from "domain/repositories";

export class CreateWorkScheduleUseCase {
    constructor(private readonly scheduleRepository: ScheduleRepository) {}

    execute(params: CreateWorkScheduleParams) {
        return this.scheduleRepository.createWorkSchedule(params);
    }
}

import { GetWorkScheduleParams, ScheduleRepository } from "domain/repositories";

export class GetWorkScheduleUseCase {
    constructor(private readonly scheduleRepository: ScheduleRepository) {}

    execute(params: GetWorkScheduleParams) {
        return this.scheduleRepository.getWorkSchedule(params);
    }
}

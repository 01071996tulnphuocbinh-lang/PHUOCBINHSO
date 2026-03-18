import { ScheduleAppointment } from "domain/entities";
import {
    CreateWorkScheduleParams,
    GetWorkScheduleParams,
    ScheduleRepository,
} from "domain/repositories";
import { createWorkSchedule, getWorkSchedule } from "infrastructure/api/mock-api";

export class ScheduleRepositoryImpl implements ScheduleRepository {
    getWorkSchedule(
        params: GetWorkScheduleParams,
    ): Promise<ScheduleAppointment | null> {
        return getWorkSchedule(params);
    }

    createWorkSchedule(
        params: CreateWorkScheduleParams,
    ): Promise<ScheduleAppointment | null> {
        return createWorkSchedule(params);
    }
}

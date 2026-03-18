import { ScheduleAppointment } from "domain/entities";

export interface CreateWorkScheduleParams {
    organizationId: string;
    date: Date;
    fullName: string;
    content: string;
    phoneNumber: string;
}

export interface GetWorkScheduleParams {
    organizationId: string;
}

export interface ScheduleRepository {
    getWorkSchedule(
        params: GetWorkScheduleParams,
    ): Promise<ScheduleAppointment | null>;
    createWorkSchedule(
        params: CreateWorkScheduleParams,
    ): Promise<ScheduleAppointment | null>;
}

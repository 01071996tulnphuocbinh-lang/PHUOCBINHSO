import { FeedbackType, Feedbacks } from "domain/entities";
import {
    CreateFeedbackParams,
    FeedbackRepository,
    GetFeedbacksParams,
    GetFeedbackTypeParams,
} from "domain/repositories";
import {
    createFeedback,
    getFeedbackTypes,
    getFeedbacks,
} from "infrastructure/api/mock-api";

export class FeedbackRepositoryImpl implements FeedbackRepository {
    getFeedbacks(params: GetFeedbacksParams): Promise<Feedbacks> {
        return getFeedbacks(params);
    }

    getFeedbackTypes(params: GetFeedbackTypeParams): Promise<FeedbackType[]> {
        return getFeedbackTypes(params);
    }

    createFeedback(
        feedback: CreateFeedbackParams,
        organizationId: string,
    ): Promise<boolean> {
        return createFeedback(feedback, organizationId);
    }
}

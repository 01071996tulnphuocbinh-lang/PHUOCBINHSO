import { FeedbackType, Feedbacks } from "domain/entities";

export interface GetFeedbacksParams {
    organizationId: string;
    page?: number;
    limit?: number;
    firstFetch?: boolean;
}

export interface GetFeedbackTypeParams {
    organizationId: string;
}

export interface CreateFeedbackParams {
    organizationId?: string;
    title: string;
    content: string;
    imageUrls?: string[];
    feedbackTypeId: number;
    token: string;
}

export interface FeedbackRepository {
    getFeedbacks(params: GetFeedbacksParams): Promise<Feedbacks>;
    getFeedbackTypes(params: GetFeedbackTypeParams): Promise<FeedbackType[]>;
    createFeedback(
        feedback: CreateFeedbackParams,
        organizationId: string,
    ): Promise<boolean>;
}

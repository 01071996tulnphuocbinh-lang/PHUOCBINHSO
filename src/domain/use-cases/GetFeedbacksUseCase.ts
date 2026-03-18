import { FeedbackRepository, GetFeedbacksParams } from "domain/repositories";

export class GetFeedbacksUseCase {
    constructor(private readonly feedbackRepository: FeedbackRepository) {}

    execute(params: GetFeedbacksParams) {
        return this.feedbackRepository.getFeedbacks(params);
    }
}

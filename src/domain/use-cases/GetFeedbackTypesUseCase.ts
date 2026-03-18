import {
    FeedbackRepository,
    GetFeedbackTypeParams,
} from "domain/repositories";

export class GetFeedbackTypesUseCase {
    constructor(private readonly feedbackRepository: FeedbackRepository) {}

    execute(params: GetFeedbackTypeParams) {
        return this.feedbackRepository.getFeedbackTypes(params);
    }
}

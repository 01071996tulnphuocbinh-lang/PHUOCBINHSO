import { CreateFeedbackParams, FeedbackRepository } from "domain/repositories";

export class CreateFeedbackUseCase {
    constructor(private readonly feedbackRepository: FeedbackRepository) {}

    execute(feedback: CreateFeedbackParams, organizationId: string) {
        return this.feedbackRepository.createFeedback(feedback, organizationId);
    }
}

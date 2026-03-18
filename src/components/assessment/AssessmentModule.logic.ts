export interface SubmitAssessmentParams {
    scriptUrl: string;
    officerName: string;
    rating: number;
    ratingText: string;
    comment: string;
}

export const buildAssessmentPayload = (params: {
    officerName: string;
    rating: number;
    ratingText: string;
    comment: string;
}) => ({
    type: "Trung tâm Phục vụ hành chính công",
    officerName: params.officerName,
    rating: params.rating,
    ratingText: params.ratingText,
    comment: params.comment.trim(),
    timestamp: new Date().toLocaleString("vi-VN"),
});

export const submitAssessment = async (
    params: SubmitAssessmentParams,
): Promise<void> => {
    const payload = buildAssessmentPayload(params);
    await fetch(params.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
};

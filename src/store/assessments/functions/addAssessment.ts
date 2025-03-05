import { ApiError } from "../../../errors";
import { ErrorMessages, errorTranslator } from "../../../util/errorTranslator";
import { TOKEN, URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";

export async function addAssessment(
  assessment: Assessment,
  errorMessages: ErrorMessages
) {
  try {
    const response = await fetch(URL_API_ASSESSMENTS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assessment),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        JSON.stringify(errorTranslator(errorData, errorMessages))
      );
    }

    const newAssessment: Assessment = await response.json();
    useAssessmentStore.setState((state) => ({
      assessments: [...state.assessments, newAssessment],
    }));

    return newAssessment;
  } catch (error) {
    throw error;
  }
}

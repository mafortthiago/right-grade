import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";

/**
 * Function that returns the assessments response for a given grading period.
 * @param {string} gradingPeriodId
 * @returns {Promise<Assessment[]>} response
 * @throws {ApiError} If the api request fails.
 * @throws {Error} For other errors.
 */
export const getAssessments = async (
  gradingPeriodId: string
): Promise<Assessment[]> => {
  const response = await generateFetch(
    `${URL_API_ASSESSMENTS}/byGradingPeriod/${gradingPeriodId}`,
    "GET"
  );

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  const assessments: Assessment[] = await response.json();
  useAssessmentStore.setState(() => ({
    assessments,
  }));
  return assessments;
};

import { ApiError } from "../../../errors";
import { TOKEN, URL_API_ASSESSMENTS } from "../assessments";

/**
 * Function that returns the assessments response for a given grading period.
 * @param {string} gradingPeriodId
 * @returns {Promise<JSON>} response
 * @throws {ApiError} If the api request fails.
 * @throws {Error} For other errors.
 */
export const getAssessments = async (
  gradingPeriodId: string
): Promise<JSON> => {
  const response = await fetch(
    `${URL_API_ASSESSMENTS}/byGradingPeriod/${gradingPeriodId}`,
    {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  return response.json();
};

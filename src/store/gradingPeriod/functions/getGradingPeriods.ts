import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL } from "../gradingPeriods";

export async function getGradingPeriods() {
  const response = await generateFetch(URL, "GET");

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  return response.json();
}

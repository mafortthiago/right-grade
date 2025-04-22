import { ApiError } from "../../../errors";
import { useClassStore } from "../../classes";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function deleteGradingPeriod(gradingPeriod: GradingPeriod) {
  const response = await generateFetch(`${URL}/${gradingPeriod.id}`, "DELETE");

  if (!response.ok) {
    throw new ApiError("An error ocurred while deleting grading period");
  }

  useClassStore.getState().updateGroups(gradingPeriod, true);
}

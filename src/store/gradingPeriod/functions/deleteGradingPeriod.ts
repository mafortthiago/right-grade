import { ApiError } from "../../../errors";
import { useClassStore } from "../../classes";
import { TOKEN, URL } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function deleteGradingPeriod(gradingPeriod: GradingPeriod) {
  const response = await fetch(`${URL}/${gradingPeriod.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new ApiError("An error ocurred while deleting grading period");
  }
  useClassStore.getState().updateGroups(gradingPeriod, true);
}

import { ApiError } from "../../../errors";
import { useClassStore } from "../../classes";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL, useGradingPeriodStore } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function addGradingPeriod(gradingPeriod: GradingPeriod) {
  const response = await generateFetch(URL, "POST", gradingPeriod);

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(JSON.stringify(errorData));
  }

  const newGradingPeriod = await response.json();
  useGradingPeriodStore.setState((state) => ({
    gradingPeriods: [...state.gradingPeriods, newGradingPeriod],
  }));
  useClassStore.getState().updateGroups(newGradingPeriod);
}

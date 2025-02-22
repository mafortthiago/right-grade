import { ApiError } from "../../../errors";
import { useClassStore } from "../../classes";
import { TOKEN, URL, useGradingPeriodStore } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function addGradingPeriod(gradingPeriod: GradingPeriod) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gradingPeriod),
  });
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

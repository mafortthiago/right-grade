import { ApiError } from "../../../errors";
import { ErrorMessages, errorTranslator } from "../../../util/errorTranslator";
import { useClassStore } from "../../classes";
import { TOKEN, URL } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function editGradingPeriod(
  gradingPeriod: GradingPeriod,
  errorMessages: ErrorMessages
) {
  const updatedGradingPeriod = {
    name: gradingPeriod.name,
    groupId: gradingPeriod.groupId,
  };
  const response = await fetch(`${URL}/${gradingPeriod.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(updatedGradingPeriod),
  });

  if (!response.ok) {
    const errors = await response.json();
    const translatedErrors = errorTranslator(errors, errorMessages);
    throw new ApiError(JSON.stringify(translatedErrors));
  }

  useClassStore.getState().updateGroups(gradingPeriod);
}

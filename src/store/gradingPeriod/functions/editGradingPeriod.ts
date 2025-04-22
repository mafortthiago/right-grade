import { ApiError } from "../../../errors";
import { ErrorMessages, errorTranslator } from "../../../util/errorTranslator";
import { useClassStore } from "../../classes";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL } from "../gradingPeriods";
import { GradingPeriod } from "../interfaces/GradingPeriod";

export async function editGradingPeriod(
  gradingPeriod: GradingPeriod,
  errorMessages: ErrorMessages
) {
  const updatedGradingPeriod = {
    name: gradingPeriod.name,
    groupId: gradingPeriod.groupId,
  };
  const response = await generateFetch(
    `${URL}/${gradingPeriod.id}`,
    "PUT",
    updatedGradingPeriod
  );

  if (!response.ok) {
    const errors = await response.json();
    const translatedErrors = errorTranslator(errors, errorMessages);
    throw new ApiError(JSON.stringify(translatedErrors));
  }

  useClassStore.getState().updateGroups(gradingPeriod);
}

import { Group } from "../classes";
import { generateFetch } from "../students/functions/updateAPI";
import { URL_API } from "../URL_API";
import { updateClassInStorage } from "./updateClassInStorage";

export async function updateMinimumGrade(group: Group) {
  const response = await generateFetch(
    URL_API + `/groups/${group.id}`,
    "PATCH",
    { minimumGrade: group.minimumGrade }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  updateClassInStorage(group);
}

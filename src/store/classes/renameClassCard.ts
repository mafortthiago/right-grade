import { Group } from "../classes";
import { generateFetch } from "../students/functions/updateAPI";
import { URL_API } from "../URL_API";
import { updateClassInStorage } from "./updateClassInStorage";

export async function renameClassCard(group: Group) {
  const response = await generateFetch(
    URL_API + `/groups/${group.id}`,
    "PATCH",
    { name: group.name }
  );

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError.error);
  }

  updateClassInStorage(group);
}

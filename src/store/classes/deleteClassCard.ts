import { Group } from "../classes";
import { generateFetch } from "../students/functions/updateAPI";
import { URL_API } from "../URL_API";
import { deleteClassInStorage } from "./deleteClassInStorage";

export async function deleteClassCard(group: Group) {
  const response = await generateFetch(
    URL_API + `/groups/${group.id}`,
    "DELETE"
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  deleteClassInStorage(group);
}

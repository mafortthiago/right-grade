import { Box, useSelectedBox } from "../../../components/table/selectedBoxes";
import { ApiError } from "../../../errors";
import { URL_API_STUDENTS, useStudentStore } from "../students";
import { generateFetch } from "./updateAPI";

/**
 * This function deletes students from selected boxes with true values,
 * excluding the header
 *
 * @param ids {@link Box}
 */
export async function deleteStudents(ids: Box) {
  setIsSaved(false);
  const idsArray = Object.entries(ids)
    .filter(([id, isSelected]) => isSelected === true && id !== "head")
    .map(([id]) => id);

  if (idsArray.length === 0) {
    setIsSaved(true);
    return;
  }

  const fetches = idsArray.map((id) =>
    generateFetch(`${URL_API_STUDENTS}/${id}`, "DELETE")
  );
  const responses = await Promise.all(fetches);

  responses.forEach((response) => {
    if (!response.ok) {
      throw new ApiError("An error occurred while deleting. Please try again.");
    }
  });

  deleteStudentsInSelectedStore(Object.keys(ids));
  deleteStudentsInStore(idsArray);

  setIsSaved(true);
}

function setIsSaved(isSaved: boolean) {
  useStudentStore.setState((state) => ({
    ...state,
    isSaved,
  }));
}

function deleteStudentsInStore(ids: string[]) {
  useStudentStore.setState((state) => ({
    students: state.students.filter((s) => !ids.includes(s.id)),
  }));
}

function deleteStudentsInSelectedStore(ids: string[]) {
  useSelectedBox.setState((state) => ({
    selectedBoxes: Object.fromEntries(
      Object.entries(state.selectedBoxes).filter(([id]) => !ids.includes(id))
    ),
  }));
}

import { ApiError } from "../../../errors";
import { Grade } from "../interfaces/Grade";
import { Student } from "../interfaces/Student";
import { TOKEN, URL_API_GRADES, useStudentStore } from "../students";
import { updateStudentInAPI } from "./updateStudentInAPI";

export async function updateAPI() {
  const studentsForUpdate: Student[] = getStudentsForUpdate();
  const gradesForUpdate: Grade[] = getGradesForUpdate();

  if (studentsForUpdate) {
    await Promise.all(
      studentsForUpdate.map(async (s) => {
        await updateStudentInAPI(s);
      })
    );
  }

  const response = await Promise.all(generateFetches(gradesForUpdate));

  response.forEach((res) => {
    if (!res.ok) {
      throw new ApiError("Erro ao atualizar a API.");
    }
  });
  useStudentStore.getState().setAllSaved();
}

function getGradesForUpdate(): Grade[] {
  return useStudentStore
    .getState()
    .students.flatMap((s) => s.grades)
    .filter((g) => !g.isSaved);
}

function getStudentsForUpdate(): Student[] {
  return useStudentStore
    .getState()
    .students.map((s) => {
      if (!s.isSaved) {
        const student: Student = {
          id: s.id,
          name: s.name,
          groupId: s.groupId,
        };
        return student;
      }
    })
    .filter((s): s is Student => s !== undefined);
}

function generateFetches(grades?: Grade[]) {
  const fetchs: Promise<Response>[] = [];
  if (grades) {
    grades.map((g) => {
      if (g.id && !g.id.includes("temp-")) {
        fetchs.push(generateFetch(`${URL_API_GRADES}/${g.id}`, "PUT", g));
      } else {
        fetchs.push(generateFetch(URL_API_GRADES, "POST", g));
      }
    });
  }

  return fetchs;
}

export function generateFetch<T>(
  url: string,
  method: string,
  entity?: T
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  if (entity) {
    options.body = JSON.stringify(entity);
  }

  return fetch(url, options);
}

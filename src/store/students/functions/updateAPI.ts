import { t } from "i18next";
import { ApiError } from "../../../errors";
import i18n from "../../../lib/i18n";
import { triggerGlobalSnackbar } from "../../../util/globalSnackbar";
import { useAuthStore } from "../../authentication/auth";
import { logout } from "../../authentication/functions/logout";
import { URL_API } from "../../URL_API";
import { Grade } from "../interfaces/Grade";
import { Student } from "../interfaces/Student";
import { URL_API_GRADES, useStudentStore } from "../students";
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
      throw new ApiError(t("updateAPI.errorUpdateAPI"));
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

export async function generateFetch<T>(
  url: string,
  method: string,
  entity?: T,
  credentialsInclude: boolean = true
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
    },
  };

  console.log(i18n.language);

  if (credentialsInclude) {
    options.credentials = "include";
  }

  if (entity) {
    options.body = JSON.stringify(entity);
  }

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshResponse = await fetch(`${URL_API}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      response = await fetch(url, options);
    } else {
      logout();
      const responseToProcess = response.clone();
      const r = await responseToProcess.json();
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        triggerGlobalSnackbar({
          title: t("updateAPI.sessionExpiredTitle"),
          body: r.error,
          isError: true,
        });
      }
      useAuthStore.setState({ isAuthenticated: false, id: "" });
    }
  }

  return response;
}

// imports
import { create } from "zustand";
import { ApiError } from "../errors";
import { errorTranslator } from "../util/errorTranslator";
import {} from "./gradingPeriod/gradingPeriods";
import { GradingPeriod } from "./gradingPeriod/interfaces/GradingPeriod";
import { generateFetch } from "./students/functions/updateAPI";
import { URL_API } from "./URL_API";

const url: string = URL_API + "/groups";

interface Groups {
  orderBy: string;
  groups: Group[];
  createGroup: (
    group: Group,
    errorMessages: ClassErrorMessages,
    onError: (error: string) => void
  ) => Promise<boolean>;
  getGroups: (id: string, sortBy: string) => any;
  updateGroups: (newGradingPeriod: GradingPeriod, isDelete?: boolean) => void;
}

export interface ClassErrorMessages {
  incorrectName: string;
  incorrectGradeType: string;
  incorrectTeacher: string;
  incorrectMinimumGrade: string;
}
export interface Page {
  id: number;
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
  isGradeFrom0To100: boolean;
  teacherId: string;
  minimumGrade: number;
  gradesAverage: number;
  studentsQuantity: number;
  gradingPeriods: GradingPeriod[];
}

export const useClassStore = create<Groups>((set, get) => ({
  groups: [],
  orderBy: "createdAt_desc",
  createGroup: async (
    group: Group,
    errorMessages: ClassErrorMessages,
    onError: (error: string) => void
  ) => {
    try {
      const response = await generateFetch(url, "POST", group);

      if (response.status != 201) {
        const errorBody = await response.json();
        throw new Error(JSON.stringify(errorBody));
      }
      await get().getGroups(group.teacherId, get().orderBy);
      return true;
    } catch (error: any) {
      let dataError = JSON.parse(error.message);
      let translatedErrors: any = errorTranslator(dataError, errorMessages);
      onError(translatedErrors);
      return false;
    }
  },
  getGroups: async (id: string, sortBy: string,) => {
    const urlGetGroups = `${url}/byTeacher/${id}?size=100${sortByFormater(
      sortBy
    )}`;
    const response = await generateFetch(urlGetGroups, "GET");

    if (!response.ok) {
      throw new ApiError("A data retrieval error has been encountered.");
    }

    const data = await response.json();
    const allGroups: Group[] = data.content;
    set((state) => ({
      ...state,
      groups: allGroups,
      quantityCards: data.totalElements,
      orderBy: sortBy,
    }));
    return allGroups;
  },
  updateGroups: (newGradingPeriod: GradingPeriod, isDelete?: boolean) => {
    set((state) => {
      const updatedGroups = state.groups.map((group) => {
        if (group.id == newGradingPeriod.groupId) {
          if (isDelete) {
            return {
              ...group,
              gradingPeriods: group.gradingPeriods.filter(
                (gp: GradingPeriod) => gp.id != newGradingPeriod.id
              ),
            };
          }
          const gradingPeriodExists = group.gradingPeriods.some(
            (gp: GradingPeriod) => gp.id == newGradingPeriod.id
          );
          if (!gradingPeriodExists) {
            group.gradingPeriods.push(newGradingPeriod);
            return {
              ...group,
            };
          }

          const updatedGradingPeriods = group.gradingPeriods.map(
            (gp: GradingPeriod) => {
              if (gp.id == newGradingPeriod.id) {
                return newGradingPeriod;
              }
              return gp;
            }
          );

          return {
            ...group,
            gradingPeriods: updatedGradingPeriods,
          };
        }
        return group;
      });
      return { ...state, groups: updatedGroups };
    });
  },
}));

const sortByFormater = (sortBy: string) => {
  let sortByEachs = sortBy.split("_");
  return `&sortBy=${sortByEachs[0]}&direction=${sortByEachs[1]}`;
};

import { create } from "zustand";
import { URL_API } from "../URL_API.ts";
import { getAssessments } from "./functions/getAssessments.ts";
import { addAssessment } from "./functions/addAssessment.ts";
import { Assessments } from "./interfaces/Assessments.ts";

export const URL_API_ASSESSMENTS = URL_API + "/assessments";
export const TOKEN = localStorage.getItem("jwt");

export const useAssessmentStore = create<Assessments>(() => ({
  assessments: [],
  getAssessments,
  addAssessment,
}));

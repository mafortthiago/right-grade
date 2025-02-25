import { create } from "zustand";
import { addGradingPeriod } from "./functions/addGradingPeriod";
import { getGradingPeriods } from "./functions/getGradingPeriods";
import { editGradingPeriod } from "./functions/editGradingPeriod";
import { deleteGradingPeriod } from "./functions/deleteGradingPeriod";
import { GradingPeriods } from "./interfaces/GradingPeriods";
import { URL_API } from "../URL_API.ts";

export const URL = URL_API + "/gradingPeriods";
export const TOKEN = localStorage.getItem("jwt");

export const useGradingPeriodStore = create<GradingPeriods>(() => ({
  gradingPeriods: [],
  addGradingPeriod,
  getGradingPeriods,
  editGradingPeriod,
  deleteGradingPeriod,
}));

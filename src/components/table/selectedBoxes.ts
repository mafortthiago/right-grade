import { create } from "zustand";

export interface Box {
  [key: string]: boolean;
}

interface UseSelectedBox {
  selectedBoxes: Box;
  set: (box: Box) => void;
  setAllBoxes: (boxes: Box) => void;
}

export const useSelectedBox = create<UseSelectedBox>((set) => ({
  selectedBoxes: {},
  set: (box: Box) =>
    set((state) => ({
      selectedBoxes: { ...state.selectedBoxes, ...box },
    })),
  setAllBoxes: (boxes: Box) =>
    set(() => ({
      selectedBoxes: boxes,
    })),
}));

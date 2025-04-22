import { ISnackbar } from "../components/Snackbar";

export function triggerGlobalSnackbar(snackbar: ISnackbar) {
  window.dispatchEvent(
    new CustomEvent("global-snackbar", { detail: snackbar })
  );
}

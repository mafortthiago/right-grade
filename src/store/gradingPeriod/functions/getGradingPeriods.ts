import { ApiError } from "../../../errors";
import { TOKEN, URL } from "../gradingPeriods";
export async function getGradingPeriods() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${TOKEN}`);

  const response = await fetch(URL, { headers });
  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }
  return response.json();
}

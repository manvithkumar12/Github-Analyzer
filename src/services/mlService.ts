export async function predictScore(payload: unknown): Promise<number> {
  const res = await fetch(process.env.MODEL_BASE_URL + "/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("ML service failed");
  }

  const json = await res.json();
  const score =
    typeof json?.score === "number" ? json.score : Number(json?.score || 0);
  return Math.max(0, score);
}

import prisma from "../lib/prisma";
import { GitResponseType } from "../types/gitResponseType";
import { updatingData, CreatingData } from "../controllers/data";

export async function upsertProfile(
  githubData: GitResponseType,
  score: number,
) {
  const updateData = updatingData(githubData, score) as any;
  const createData = CreatingData(githubData, score) as any;

  const profile = await prisma.profile.upsert({
    where: { username: githubData.login },
    update: updateData,
    create: createData,
  });

  // convert bigint to string for JSON safety
  return JSON.parse(
    JSON.stringify(profile, (_k, v) =>
      typeof v === "bigint" ? v.toString() : v,
    ),
  );
}

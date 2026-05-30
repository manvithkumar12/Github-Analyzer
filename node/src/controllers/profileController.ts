import { Request, Response } from "express";
import { fetchGitHubUser, fetchUserRepos } from "../services/githubService";
import { predictScore } from "../services/mlService";
import { upsertProfile } from "../services/profileService";
import { modelQuery } from "./data";
import { ReposDataExtract } from "../utils/analyze";
import { ExtractedRes } from "../utils/analyze";
import { GitResponseType } from "../types/gitResponseType";
import { RatingDataType } from "../types/RatingData";

export const analyzeProfile = async (req: Request, res: Response) => {
  try {
    const username = Array.isArray(req.params.username)
      ? req.params.username[0]
      : req.params.username;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const data = await fetchGitHubUser(username);
    const repos = await fetchUserRepos(username);
    const finalRepoData = ReposDataExtract(repos as RatingDataType);

    const scorePayload = modelQuery(
      data as GitResponseType,
      finalRepoData as ExtractedRes,
    );
    const score = await predictScore(scorePayload);

    const profile = await upsertProfile(data as GitResponseType, score);
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error analyzing profile:", error);
    return res.status(500).json({ message: "Failed to analyze profile" });
  }
};

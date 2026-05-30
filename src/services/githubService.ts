import axios from "axios";
import { GitResponseType } from "../types/gitResponseType";
import { RatingDataType } from "../types/RatingData";

export async function fetchGitHubUser(
  username: string,
): Promise<GitResponseType> {
  const { data } = await axios.get<GitResponseType>(
    `${process.env.GIT_HUB_URL}${encodeURIComponent(username)}`,
  );
  return data;
}

export async function fetchUserRepos(
  username: string,
): Promise<RatingDataType> {
  const { data } = await axios.get<RatingDataType>(
    `${process.env.GIT_HUB_URL}${encodeURIComponent(username)}/repos`,
  );
  return data;
}

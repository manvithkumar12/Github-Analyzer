import { GitResponseType } from "../types/gitResponseType";
import { ExtractedRes } from "../utils/analyze";

export const updatingData = (data: GitResponseType, ModelRes: number) => {
  const Returndata = {
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    publicGists: data.public_gists,
    Score: ModelRes,
  };
  return Returndata;
};

export const CreatingData = (data: GitResponseType, ModelRes: number) => {
  const ReturnData = {
    githubId: BigInt(data.id),
    username: data.login,
    name: data.name,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    publicGists: data.public_gists,
    avatarUrl: data.avatar_url,
    profileUrl: data.html_url,
    Score: ModelRes,
  };
  return ReturnData;
};

export const modelQuery = (data: GitResponseType, ReposData: ExtractedRes) => {
  const currentDate = new Date();
  const accountAge = Math.floor(
    (currentDate.getTime() - new Date(data.created_at).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return {
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    publicGists: data.public_gists,
    accountAge: accountAge,
    hasBio: data.bio ? 1 : 0,
    hasCompany: data.company ? 1 : 0,
    hasLocation: data.location ? 1 : 0,
    hasTwitter: data.twitter_username ? 1 : 0,
    isHireable: data.hireable ? 1 : 0,
    repoCount: ReposData.repoCount,
    totalStars: ReposData.totalStars,
    totalForks: ReposData.totalForks,
    totalSize: ReposData.totalSize,
    totalWatchers: ReposData.totalWatchers,
    maxStarsOnRepo: ReposData.maxStarsOnRepo,
    avgStarsPerRepo: ReposData.avgStarsPerRepo,
    languagesCount: ReposData.languagesCount,
    activeRepos: ReposData.activeRepos,
  };
};

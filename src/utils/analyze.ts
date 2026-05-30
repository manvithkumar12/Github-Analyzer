import { RatingDataType } from "../types/RatingData";

export type ExtractedRes = {
  repoCount: number;
  totalStars: number;
  totalForks: number;
  totalSize: number;
  totalWatchers: number;
  maxStarsOnRepo: number;
  avgStarsPerRepo: number;
  languagesCount: number;
  activeRepos: number;
};

export const ReposDataExtract = (
  data: RatingDataType,
): ExtractedRes => {

  const totalStars = data.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const totalForks = data.reduce((sum, repo) => sum + repo.forks_count, 0);

  const totalSize = data.reduce((sum, repo) => sum + repo.size, 0);

  const totalWatchers = data.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0,
  );

  const maxStarsOnRepo = Math.max(
    ...data.map((repo) => repo.stargazers_count),
    0,
  );

  const avgStarsPerRepo = data.length > 0 ? totalStars / data.length : 0;

  const languagesCount = new Set(
    data.map((repo) => repo.language).filter(Boolean),
  ).size;

  const activeRepos = data.filter((repo) => {
    const pushed = new Date(repo.pushed_at);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return pushed > oneYearAgo;
  }).length;

  return {
    repoCount: data.length,
    totalStars,
    totalForks,
    totalSize,
    totalWatchers,
    maxStarsOnRepo,
    avgStarsPerRepo,
    languagesCount,
    activeRepos,
  };
};

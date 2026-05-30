export type GitResponseType = {
  login: string;
  id: number;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
};

export type EpisodeType = {
  id: number;
  name: string;
  url: string;
};

export type CharacterType = {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  episode: string[];
};

export type SingleEpisodeType = {
  id: number;
  air_date: string;
  characters: string[];
  name: string;
};

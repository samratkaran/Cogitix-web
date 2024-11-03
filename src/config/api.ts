// api.js
import { CharacterType, EpisodeType, SingleEpisodeType } from "../types/index";

export const fetchAllEpisodes = async (): Promise<EpisodeType[]> => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();
  return data.results;
};

export const fetchEpisodeDetails = async (
  episodeNumber: number
): Promise<{
  episodeDetails: SingleEpisodeType;
  characters: CharacterType[];
}> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeNumber}`
  );
  const episodeData: SingleEpisodeType = await response.json();

  const characters = await Promise.all(
    episodeData.characters.map(async (characterUrl) => {
      const characterRes = await fetch(characterUrl);
      return characterRes.json();
    })
  );

  return { episodeDetails: episodeData, characters };
};

import React from "react";
import { CharacterType } from "../types";

type CharacterCardProps = {
  character: CharacterType;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <img
      src={character.image}
      alt={`${character.name}`}
      className="mb-2 w-full h-48 object-cover rounded"
    />
    <h2 className="text-xl font-semibold">{character.name}</h2>
    <p>Status: {character.status}</p>
    <p>Gender: {character.gender}</p>
  </div>
);

export default CharacterCard;

// App.tsx
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import SkeletonLoader from "./components/Skeleton";
import Pagination from "./components/Pagination";
import CharacterCard from "./components/CharacterCard";
import { fetchAllEpisodes, fetchEpisodeDetails } from "./config/api";
import { EpisodeType, SingleEpisodeType, CharacterType } from "./types";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [episodeList, setEpisodeList] = useState<EpisodeType[]>([]);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [episodeDetails, setEpisodeDetails] = useState<SingleEpisodeType>();
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 15;

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const episodes = await fetchAllEpisodes();
        setEpisodeList(episodes);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };
    loadEpisodes();
  }, []);

  useEffect(() => {
    const loadEpisodeCharacters = async () => {
      setLoading(true);
      try {
        const { episodeDetails, characters } = await fetchEpisodeDetails(
          episodeNumber
        );
        setEpisodeDetails(episodeDetails);
        setCharacters(characters);
      } catch (error) {
        console.error("Failed to fetch episode details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEpisodeCharacters();
  }, [episodeNumber]);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-xl font-bold text-gray-800">Karan</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {episodeList.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full text-left rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                item.id === episodeNumber ? "font-extrabold" : ""
              }`}
              onClick={() => {
                setEpisodeNumber(item.id);
                setCurrentPage(1); // Reset to first page on episode change
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto text-lg font-semibold">Welcome, User!</div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="mb-6 text-3xl font-bold">{episodeDetails?.name}</h1>
          {loading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map(() => (
                <SkeletonLoader />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
          <Pagination
            totalItems={characters.length}
            itemsPerPage={charactersPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;

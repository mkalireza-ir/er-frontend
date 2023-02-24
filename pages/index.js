import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { getGames } from "@/api/gamesApi";
export default function Page() {
  const [games, setGames] = useState([]);
  const { data, isLoading } = useQuery("games", getGames);
  useEffect(() => {
    if (!isLoading) {
      setGames(data.data.data);
    }
  }, [isLoading]);
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {!isLoading &&
          games.map((game) => (
            <Link
              href={`/${game.id}`}
              key={game.id}
              className="text-center p-3 bg-[rgba(0,0,0,0.5)] text-white rounded"
            >
              {game.attributes.title}
            </Link>
          ))}
      </div>
    </main>
  );
}

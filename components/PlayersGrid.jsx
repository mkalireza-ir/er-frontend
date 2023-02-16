import React from "react";
import Player from "./Player";
import { useGameContext } from "@/context/gameContext";
export default function PlayersGrid() {
  const { gameState } = useGameContext();
  return (
    <div className="flex gap-[20px] mt-5 flex-wrap justify-center">
      {gameState?.attributes?.player?.map((player, i) => {
        return <Player key={i} player={player} />;
      })}
    </div>
  );
}

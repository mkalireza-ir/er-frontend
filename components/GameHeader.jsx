import React from "react";
import { useGameContext } from "@/context/gameContext";
export default function GameHeader() {
  const { gameState } = useGameContext();
  return (
    <div className="flex items-center flex-col gap-y-2 bg-[rgba(0,0,0,0.5)] p-2 py-3 rounded-md">
      <div className="text-white font-bold text-sm">
        {gameState?.attributes?.title}
      </div>
      <div className="text-white text-xs">
        {gameState?.attributes?.time} - {gameState?.attributes?.date}
      </div>
    </div>
  );
}

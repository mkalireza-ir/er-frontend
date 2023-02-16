import React from "react";
import { useGameContext } from "@/context/gameContext";
export default function Hearts(props) {
  const { gameState, dispatchGameState } = useGameContext();
  const gameHearts = Number(gameState?.attributes?.hearts);
  const playerHearts = Number(props.player.hearts);
  const activeHeart = (
    <div
      className="cursor-pointer select-none"
      onClick={() => {
        dispatchGameState({
          type: "HEARTS_DOWN",
          payload: { playerId: props.player.id },
        });
      }}
    >
      <img className="w-10" src="/images/active-heart.png" />
    </div>
  );
  const deactiveHeart = (
    <div
      className="cursor-pointer select-none"
      onClick={() => {
        dispatchGameState({
          type: "HEARTS_UP",
          payload: { playerId: props.player.id },
        });
      }}
    >
      <img className="w-10" src="/images/deactive-heart.png" />
    </div>
  );
  const heartsArray = [];
  for (let i = 0; i < gameHearts - playerHearts; i++) {
    heartsArray.push(deactiveHeart);
  }
  for (let i = 0; i < Number(playerHearts); i++) {
    heartsArray.push(activeHeart);
  }
  return heartsArray.map((heart) => heart);
}

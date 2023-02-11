import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import { getGameById } from "@/api/gamesApi";
import { gameReducer } from "@/store/gameReducer";
import { useRouter } from "next/router";
export default function GameSingle() {
  const router = useRouter();
  const [gameState, dispatchGameState] = useReducer(gameReducer, null);
  const { data: gameData, isLoading: gameIsLoading } = useQuery({
    queryKey: ["game", router.query.id],
    queryFn: () => {
      return getGameById(router.query.id);
    },
  });
  useEffect(() => {
    if (gameIsLoading) return;
    const game = gameData.data.data;
    if (game.attributes.date) {
      let dateInteger = Date.parse(game.attributes.date);
      const persianDate = new Date(dateInteger).toLocaleDateString("fa-IR");
      const newTime = new Date(dateInteger).toLocaleTimeString("fa-IR");
      game.attributes.time = newTime;
      game.attributes.date = persianDate;
    }
    dispatchGameState({ type: "SET_DATA", payload: { data: game } });
  }, [gameData]);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  const BoardUI = () => {
    const players = gameState?.attributes?.player;
    const hearts = Number(gameState?.attributes?.hearts);
    return players?.map((player, i) => {
      const activeHeart = (
        <div
          className="inline-block"
          onClick={() => {
            dispatchGameState({
              type: "HEARTS_DOWN",
              payload: { playerId: player.id },
            });
          }}
        >
          <img
            className="inline-block w-10 m-[1px]"
            src="/images/active-heart.png"
          />
        </div>
      );
      const deactiveHeart = (
        <div
          className="inline-block"
          onClick={() => {
            dispatchGameState({
              type: "HEARTS_UP",
              payload: { playerId: player.id },
            });
          }}
        >
          <img
            className="inline-block w-10 m-[1px]"
            src="/images/deactive-heart.png"
          />
        </div>
      );
      const heartsArray = [];
      for (let i = 0; i < hearts - Number(player.hearts); i++) {
        heartsArray.push(deactiveHeart);
      }
      for (let i = 0; i < Number(player.hearts); i++) {
        heartsArray.push(activeHeart);
      }
      const avatar_url =
        "http://localhost:1337" + player?.avatar?.data?.attributes?.url;
      return (
        <div
          key={i}
          className=" p-3 rounded w-[calc(50%-10px)] shrink-0 items-center"
        >
          <div className="flex w-full justify-center items-center">
            <div className="flex flex-wrap justify-center ml-3 flex-col">
              <div className="w-full border border-2 bg-white border-gray-500 rounded px-2 py-1 text-center">
                {player.name}
              </div>
              <div className="mt-1">
                {heartsArray.map((heart, i) => {
                  if (i % 5 === 0 && i !== 0) {
                    return (
                      <>
                        {/* <div className="w-full shrink-0"></div> */}
                        {heart}
                      </>
                    );
                  }
                  return heart;
                })}
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${avatar_url})` }}
              className="flex bg-no-repeat bg-cover justify-center items-center w-[100px] h-[100px] rounded-[50px] border border-gray-500 bg-white border-4"
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-white">{gameState?.attributes?.title}</div>
        <div className="text-white">
          {gameState?.attributes?.time} - {gameState?.attributes?.date}
        </div>
      </div>
      <div className="flex gap-[20px] mt-5 flex-wrap justify-center">
        <BoardUI />
      </div>
    </div>
  );
}

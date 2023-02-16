import React, { useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { getGameById } from "@/api/gamesApi";
import { updatePlayers } from "@/api/gamesApi";
import { gameReducer } from "@/store/gameReducer";
import { useRouter } from "next/router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Link from "next/link";
export default function GameSingle() {
  const router = useRouter();
  const [gameState, dispatchGameState] = useReducer(gameReducer, {});

  const { data: gameData, isLoading: gameIsLoading } = useQuery({
    queryKey: ["game", router.query.id],
    queryFn: () => {
      return getGameById(router.query.id);
    },
  });

  const { refetch: updatePlayersRefetch, isFetching: updatePlayersIsFetching } =
    useQuery({
      queryKey: ["updatePlayers", router.query.id],
      queryFn: () => {
        return updatePlayers(router.query.id, gameState?.attributes?.player);
      },
      enabled: false,
    });

  const heartsUpHandler = (player) => {
    dispatchGameState({
      type: "HEARTS_UP",
      payload: { playerId: player.id },
    });
  };

  const heartsDownHandler = (player) => {
    dispatchGameState({
      type: "HEARTS_DOWN",
      payload: { playerId: player.id },
    });
  };

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
    if (!gameIsLoading) {
      updatePlayersRefetch();
    }
  }, [gameState]);

  const BoardUI = () => {
    const players = gameState?.attributes?.player;
    const hearts = Number(gameState?.attributes?.hearts);
    return players?.map((player, i) => {
      const activeHeart = (
        <div
          className="cursor-pointer select-none"
          onClick={() => {
            heartsDownHandler(player);
          }}
        >
          <img className="w-10" src="/images/active-heart.png" />
        </div>
      );
      const deactiveHeart = (
        <div
          className="cursor-pointer select-none"
          onClick={() => {
            heartsUpHandler(player);
          }}
        >
          <img className="w-10" src="/images/deactive-heart.png" />
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
          className=" p-3 rounded w-[calc(50%-10px)] shrink-0 items-center min-w-[400px]"
        >
          <div className="flex w-full justify-center items-center">
            <div className="flex flex-wrap justify-center ml-3 flex-col">
              <div
                className={`w-full border bg-[rgba(0,0,0,0.5)] text-white border-gray-600 rounded px-2 py-1 text-center`}
              >
                {player.name}
              </div>
              <div className="mt-1 flex items-center gap-x-1">
                {heartsArray.map((heart, i) => {
                  if (i % 5 === 0 && i !== 0) {
                    return heart;
                  }
                  return heart;
                })}
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${avatar_url})`,
                borderColor: player.color,
              }}
              className={`flex bg-no-repeat bg-cover justify-center items-center w-[100px] h-[100px] rounded-full bg-white border-4 bg-center aspect-square`}
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {updatePlayersIsFetching && (
        <div className="absolute w-full h-full z-10 bg-black opacity-80 top-0 right-0 flex items-center justify-center text-white">
          در حال ارسال اطلاعات...
        </div>
      )}
      <div className="flex items-center flex-col gap-y-2 bg-[rgba(0,0,0,0.5)] p-2 py-3 rounded-md">
        <div className="text-white font-bold text-sm">
          {gameState?.attributes?.title}
        </div>
        <div className="text-white text-xs">
          {gameState?.attributes?.time} - {gameState?.attributes?.date}
        </div>
      </div>
      <div className="flex gap-[20px] mt-5 flex-wrap justify-center">
        <BoardUI />
      </div>
      <Link
        href="/"
        className="absolute left-5 bottom-5 bg-black rounded-md text-white p-3 "
      >
        <IoArrowBackCircleSharp size={30} />
      </Link>
    </div>
  );
}

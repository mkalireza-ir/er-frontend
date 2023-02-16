import React, { useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { getGameById } from "@/api/gamesApi";
import { updatePlayers } from "@/api/gamesApi";
import { gameReducer } from "@/store/gameReducer";
import { useRouter } from "next/router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Link from "next/link";
import Hearts from "@/components/hearts";
import Test from "@/components/Test";
import { GameContext } from "@/context/gameContext";
import Player from "@/components/Player";
import BackBtn from "@/components/BackBtn";
import Loading from "@/components/Loading";
import GameHeader from "@/components/GameHeader";
import PlayersGrid from "@/components/PlayersGrid";
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

  return (
    <GameContext.Provider
      value={{
        gameState,
        dispatchGameState,
      }}
    >
      <div>
        {updatePlayersIsFetching && <Loading />}
        <GameHeader />
        <PlayersGrid />
        <BackBtn url="/" />
      </div>
    </GameContext.Provider>
  );
}

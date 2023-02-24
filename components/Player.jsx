import React from "react";
import Hearts from "./Hearts";
import { useGameContext } from "@/context/gameContext";
export default function Player(props) {
  const { gameState } = useGameContext();
  const avatar_url = `${process.env.ENDPOINT_URL}${props?.player?.avatar?.data?.attributes?.url}`;
  return (
    <div className=" p-3 rounded w-[calc(50%-10px)] shrink-0 items-center min-w-[400px]">
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-wrap justify-center ml-3 flex-col">
          <div
            className={`w-full border bg-[rgba(0,0,0,0.5)] text-white border-gray-600 rounded px-2 py-1 text-center`}
          >
            {props.player.name}
          </div>
          <div className="mt-1 flex items-center gap-x-1">
            <Hearts player={props.player} />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${avatar_url})`,
            borderColor: props.player.color,
          }}
          className={`flex bg-no-repeat bg-cover justify-center items-center w-[100px] h-[100px] rounded-full bg-white border-4 bg-center aspect-square`}
        ></div>
      </div>
    </div>
  );
}

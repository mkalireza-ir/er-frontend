import axios from "axios";

export async function getGames() {
  return await axios.get(
    `${process.env.ENDPOINT_URL}/api/games?populate=*&sort[0]=createdAt:desc`
  );
}

export async function getGameById(id) {
  if (!id) return;
  return await axios.get(
    `${process.env.ENDPOINT_URL}/api/games/${id}?populate[0]=player&populate[1]=player.avatar`
  );
}

export async function updatePlayers(gameId, players) {
  let newPlayers = structuredClone(players);
  newPlayers = newPlayers.map((player) => {
    delete player.avatar;
    return player;
  });
  return await axios.put(
    `${process.env.ENDPOINT_URL}/api/games/${gameId}?populate[0]=player&populate[1]=player.avatar`,
    {
      data: {
        player: [...newPlayers],
      },
    }
  );
}

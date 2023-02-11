import axios from "axios";
export async function getGames() {
  return await axios.get(
    "http://localhost:1337/api/games?populate=*&sort[0]=createdAt:desc"
  );
}
export async function getGameById(id) {
  return await axios.get(
    `http://localhost:1337/api/games/${id}?populate[0]=player&populate[1]=player.avatar`
  );
}

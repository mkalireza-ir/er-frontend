import { changePlayerHearts } from "@/api/gamesApi";
export function gameReducer(state, action) {
  switch (action.type) {
    case "SET_DATA": {
      return action.payload.data;
    }
    case "HEARTS_UP": {
      let newState = {};
      newState = { ...state };
      const playerId = action.payload.playerId;
      const index = newState.attributes.player.findIndex((player) => {
        return player.id === playerId;
      });
      newState.attributes.player[index].hearts =
        Number(newState.attributes.player[index].hearts) + 1;
      return newState;
    }
    case "HEARTS_DOWN": {
      let newState = {};
      newState = { ...state };
      const playerId = action.payload.playerId;
      const index = newState.attributes.player.findIndex((player) => {
        return player.id === playerId;
      });
      newState.attributes.player[index].hearts =
        Number(newState.attributes.player[index].hearts) - 1;
      return newState;
    }
    default: {
    }
  }
}

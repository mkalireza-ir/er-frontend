export function gameReducer(state, action) {
  switch (action.type) {
    case "SET_DATA": {
      console.log("SET_DATA");
      return action.payload.data;
    }
    case "HEARTS_UP": {
      const newState = state;
      console.log("UP");
      /* const playerId = action.payload.playerId;
        const index = newState.attributes.player.findIndex((player) => {
          return (player.id = playerId);
        });
        newState.attributes.player[index].hearts =
          Number(newState.attributes.player[index].hearts) + 1; */
      return newState;
    }
    case "HEARTS_DOWN": {
      console.log("DOWN");
      const newState = state;
      /* const playerId = action.payload.playerId;
        const index = newState.attributes.player.findIndex((player) => {
          return player.id === playerId;
        });
        newState.attributes.player[index].hearts =
          Number(newState.attributes.player[index].hearts) - 1;
        console.log(newState.attributes.player[index]); */
      return newState;
    }
    default: {
    }
  }
}

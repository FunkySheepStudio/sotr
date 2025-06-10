import { Room, Client } from "@colyseus/core";
import { Player, GameRoomState } from "./schema/Game_Room_State";

export class GameRoom extends Room<GameRoomState> {
  maxClients = 2;
  state = new GameRoomState();

  onCreate (options: any) {
    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const player = new Player();

    if (!this.locked)
    {
      player.x = (500);
      player.y = (100);
    } else {
      player.x = (500);
      player.y = (900);
      this.broadcast("start-game", "Room locked, starting the game");
    }

    // place Player at a random position

    // place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}

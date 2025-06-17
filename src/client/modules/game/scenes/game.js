import { App } from "../../app.js"
import MoveArrow from "../gameObjects/ui/moveArrow.js"

export default class Game extends Phaser.Scene
{
    preload ()
    {
        this.load.image('ship_0001', 'https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png');
        this.load.image('tile_base', 'assets/tile_base.png');
    }

    create()
    {
      this.createGame()
      this.add.existing(new MoveArrow(this, 400, 400))
      const joinGameButton = this.add.text(100, 100, 'Start Battle!', { fill: '#000000' });
      joinGameButton.setInteractive();
      joinGameButton.on('pointerdown', () => {
          joinGameButton.removeAllListeners()
          this.JoinGame(); 
      });
    }

    async JoinGame()
    {
        this.room = await App.client.joinOrCreate("game_room");

        const $ = Colyseus.getStateCallbacks(this.room);
        $(this.room.state).players.onAdd((player, sessionId) => {
            const entity = this.add.image(player.x, player.y, 'ship_0001');
            
            if (sessionId === this.room.sessionId)
            {
                //this.cameras.main.startFollow(entity)
            }
        });

        this.room.onMessage("start-game", (client, payload) => {
            //this.createGame()
        })
    }

    createGame()
    {
        const mapData = new Phaser.Tilemaps.MapData({
            width: 10,
            height: 10,
            tileWidth: 64,
            tileHeight: 64,
            orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
            format: Phaser.Tilemaps.Formats.ARRAY_2D
        });

        const map = new Phaser.Tilemaps.Tilemap(this, mapData);

        const tileset = map.addTilesetImage('tile_base');

        const layer = map.createBlankLayer('layer', tileset, 350, 100);

        const mapArray = new Array(10).fill(0).map(() => new Array(10).fill(0));

        mapArray.forEach((row, x) => {

            row.forEach((tile, y) => {

                layer.putTileAt(tile, x, y);
            });
        });
    }

    update(time, delta) {
    }
}
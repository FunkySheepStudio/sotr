const { reactive } = Vue

const store = reactive(
    {
        async StartNetworkClient()
        {
            this.client = new Colyseus.Client("ws://localhost:2567")
        },
        StartPhaserGame()
        {
            class Game extends Phaser.Scene
            {
                preload ()
                {
                    this.load.image('ship_0001', 'https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png');
                }

                create()
                {
                    const joinGameButton = this.add.text(100, 100, 'Start Battle!', { fill: '#000000' });
                    joinGameButton.setInteractive();
                    joinGameButton.on('pointerdown', () => {
                        joinGameButton.removeAllListeners()
                        this.JoinGame(); 
                    });
                }

                async JoinGame()
                {
                    this.room = await store.client.joinOrCreate("game_room");

                    const $ = Colyseus.getStateCallbacks(this.room);
                    $(this.room.state).players.onAdd((player, sessionId) => {
                        const entity = this.add.image(player.x, player.y, 'ship_0001');
                        
                        if (sessionId === this.room.sessionId)
                        {
                            scene.cameras.main.startFollow(entity)
                        }
                    });

                    this.room.onMessage("start-game", (client, payload) => {
                        this.createGame()
                    })
                }

                createGame()
                {
                    for (let x = 0; x < 1000; x+=100) {
                        this.add.line(x, 500, 0, 0, 0 , 1000, 0x000000)
                    }

                    for (let y = 0; y < 1000; y+=100) {
                        this.add.line(500, y, 0, 0, 1000 , 0, 0x000000)
                    }
                }

                update(time, delta) {
                }
            }

            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: Game,
                parent: 'game-container',
                backgroundColor: '#FFFFFF',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 }
                    }
                }
            };

            this.game = new Phaser.Game(config);
        }
    }
)

store.StartNetworkClient()
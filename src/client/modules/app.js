import GameScene from './game/scenes/game.js'

export const App = 
{
  async StartNetworkClient()
  {
      App.client = await new Colyseus.Client("ws://localhost:2567")
  },
  StartPhaserGame()
  {
    const config = {
        type: Phaser.AUTO,
        width: 768,
        height: 768,
        scene: GameScene,
        parent: 'game-container',
        backgroundColor: '#FFFFFF'
      };

    App.game = new Phaser.Game(config);
  }
}

await App.StartNetworkClient()
App.StartPhaserGame()
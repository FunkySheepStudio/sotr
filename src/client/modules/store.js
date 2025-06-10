const { reactive } = Vue

const store = reactive(
    {
        async StartNetworkClient()
        {
            this.client = new Colyseus.Client("ws://localhost:2567")
        },
        StartPhaserGame()
        {
            class Example extends Phaser.Scene
            {
                preload ()
                {
                    this.load.setBaseURL('https://labs.phaser.io');

                    this.load.image('sky', 'assets/skies/space3.png');
                    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
                    this.load.image('red', 'assets/particles/red.png');
                }

                create ()
                {
                    this.add.image(400, 300, 'sky');

                    const particles = this.add.particles(0, 0, 'red', {
                        speed: 100,
                        scale: { start: 1, end: 0 },
                        blendMode: 'ADD'
                    });

                    const logo = this.physics.add.image(400, 100, 'logo');

                    logo.setVelocity(100, 200);
                    logo.setBounce(1, 1);
                    logo.setCollideWorldBounds(true);

                    particles.startFollow(logo);
                }
            }

            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: Example,
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
export default class MoveArrow extends Phaser.GameObjects.Container
{
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    this.create()
  }

  create()
  {
    this.line = this.scene.add.line(0, 0, 0, 0, 200, 0, 0xcccccc).setOrigin(0)
    this.line.setLineWidth(25, 5);
    this.add(this.line)

    this.arrows = this.scene.add.group()
    for (let index = 0; index < 4; index++) {
      this.arrows.add(this.scene.add.isotriangle(0, 0, 25, 50, false, 0x00b9f2, 0x016fce, 0x028fdf))
    }
    Phaser.Actions.Angle(this.arrows.getChildren(), 90);
    this.add(this.arrows.getChildren())

    this.setInteractive(
      new Phaser.Geom.Circle(50, 50, 200), Phaser.Geom.Circle.Contains
    ).on('pointermove', function(pointer, localX, localY, event){
      this.rotation = Phaser.Math.Angle.Between(0, 0, pointer.x - this.x, pointer.y - this.y)
      this.line.setTo(0, 0, Phaser.Math.Distance.Between(0, 0, pointer.x - this.x, pointer.y - this.y), 0);
      Phaser.Actions.PlaceOnLine(this.arrows.getChildren(), this.line.geom);
    })
  }

  preUpdate (time, delta)
  {
  }
}
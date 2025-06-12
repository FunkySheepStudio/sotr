export default class MoveArrow extends Phaser.GameObjects.Container
{
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.add(new Phaser.GameObjects.Arc(scene, 0, 0, 100, 0, 360, false, 0x888888))
    this.add(new Phaser.GameObjects.Line(scene, 50, 0, 100, 0, 0, 0, 0xFF000))
    this.add(new Phaser.GameObjects.Line(scene, 60, 0, 200, 0, 100, 0, 0x0000FF))

    const graphics = new Phaser.GameObjects.Graphics(scene)
    this.add(graphics);
    graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
    graphics.fillTriangle(100, 50, 100, -50, 200, 0);

    this.setInteractive(
      new Phaser.Geom.Circle(50, 50, 200), Phaser.Geom.Circle.Contains
    ).on('pointermove', function(pointer, localX, localY, event){
      this.rotation = Phaser.Math.Angle.Between(0, 0, pointer.x - x, pointer.y - y)
    })
  }

  preUpdate (time, delta)
  {
    /*this.rotation = Phaser.Math.Angle.Between(0, 0, Phaser.Input.Pointer.downX - this.x, Phaser.Input.Pointer.downY - this.y)
    console.log(Phaser.Math.Angle.Between(0, 0, Phaser.Input.Pointer.downX - this.x, Phaser.Input.Pointer.downY - this.y))*/
  }
}
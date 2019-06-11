export default abstract class DrawingObject {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  private generateUniqueId() {
    let idLength = 8;
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < idLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  constructor() {
    this.id = this.generateUniqueId();
    this.x = 0;
    this.y = 0;
  }

  abstract update(values: Object): void;
}

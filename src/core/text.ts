import DrawingObject from "./drawingObject";

export default class Text extends DrawingObject {
  public text: string;
  public color: string;
  public fontFamily: string;

  constructor(text: string, color: string, fontFamily: string) {
    super();

    this.text = text;
    this.color = color;
    this.fontFamily = fontFamily;
  }
}

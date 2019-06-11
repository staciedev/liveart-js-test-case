import DrawingObject from "./drawingObject";

export default class Text extends DrawingObject {
  public text: string;
  public color: string;
  public fontFamily: string;

  constructor(text: string, color: string = "#000", fontFamily: string = "") {
    super();

    this.text = text;
    this.color = color;
    this.fontFamily = fontFamily;
  }

  update(values: Object) {
    if (typeof values.text == "string") {
      this.text = values.text;
    }
    if (typeof values.color == "string") {
      this.color = values.color;
    }
    if (typeof values.fontFamily == "string") {
      this.fontFamily = values.fontFamily;
    }
  }
}

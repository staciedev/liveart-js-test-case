import DrawingObject from "./drawingObject";

export default class Image extends DrawingObject {
  public url: string;
  public filter: string;

  constructor() {
    super();
  }
}

import DrawingObject from "./drawingObject";

export default class Collection {
  // first item in array is the one on top
  public items: DrawingObject[];

  constructor() {
    this.items = [];
  }

  add(item: DrawingObject) {
    this.items.unshift(item);
  }

  remove(item: DrawingObject) {
    let index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  moveToFront(item: DrawingObject) {
    let index = this.items.indexOf(item);
    if (index === 0) return;

    this.items.splice(index, 1);
    this.items.unshift(item);
  }

  moveToBack(item: DrawingObject) {
    let index = this.items.indexOf(item);
    if (index === this.items.length - 1) return;

    this.items.splice(index, 1);
    this.items.push(item);
  }
}

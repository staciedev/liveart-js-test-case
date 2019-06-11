import { fabric } from "fabric";
import Text from "./core/text";
import Image from "./core/image";
import DrawingObject from "./core/drawingObject";
import GraphicConnector from "./iGraphicConnector";
import { Observable } from "rxjs";

export default class FabricConnector implements GraphicConnector {
  private canvas;
  private width = 400;
  private height = 400;

  // a hack to store connection between Fabric object and app object
  private hash: any[] = [];

  public selected$: Observable<DrawingObject>;
  public deselected$: Observable<any>;

  constructor() {
    this.canvas = new fabric.Canvas("fabric-canvas");
    this.canvas.setHeight(this.width);
    this.canvas.setWidth(this.height);

    this.selected$ = new Observable(subscriber => {
      let self = this;
      this.canvas.on("selection:updated", function() {
        subscriber.next(self.getSelected());
      });
      this.canvas.on("selection:created", function() {
        subscriber.next(self.getSelected());
      });
    });

    this.deselected$ = new Observable(subscriber => {
      this.canvas.on("selection:cleared", function() {
        subscriber.next();
      });
    });
  }

  addText(text: Text) {
    let fabricText = new fabric.Text(text.text, {
      fill: text.color,
      fontFamily: text.fontFamily
    });

    this.canvas.add(fabricText);
    this.hash.push({ app: text, lib: fabricText });
  }

  updateText(text: Text, values: Object) {
    let result = this.hash.find(element => {
      return element.app === text;
    });
    if (!result) return;
    let fabricText = result.lib;

    fabricText.set({ fontFamily: values.fontFamily, fill: values.color });
    this.canvas.renderAll();
  }

  public addImage(image: Image) {
    // fabric.Image.fromURL(
    //   url,
    //   img => {
    //     img.set(options);
    //     this.canvas.add(img);
    //     if (options.filter === "grayscale") {
    //       img.filters.push(new fabric.Image.filters.Grayscale());
    //       img.applyFilters();
    //     }
    //   },
    //   {
    //     crossOrigin: "Anonymous"
    //   }
    // );
  }

  getSelected(): DrawingObject {
    let result = this.hash.find((element, index, array) => {
      return element.lib === this.canvas.getActiveObject();
    });
    return result ? result.app : undefined;
  }

  removeSelected() {
    // TODO: what if it's multiselection?
    this.canvas.remove(this.canvas.getActiveObject());
  }

  moveSelectedToFront() {
    this.canvas.bringToFront(this.canvas.getActiveObject());
  }

  moveSelectedToBack() {
    this.canvas.sendToBack(this.canvas.getActiveObject());
  }
}

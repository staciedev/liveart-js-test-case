import { fabric } from "fabric";
import Text from "./core/text";
import Image from "./core/image";

export default class FabricConnector {
  public canvas;
  width = 400;
  height = 400;

  hash: any[] = [];

  constructor() {
    this.canvas = new fabric.Canvas("fabric-canvas");
    this.canvas.setHeight(this.width);
    this.canvas.setWidth(this.height);

    this.canvas.on("object:selected", function(event) {
      // console.log("event", event.target);
      // for (const key in event) {
      //   if (event.hasOwnProperty(key)) {
      //     console.log(key);
      //   }
      // }
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

  public addImage(url, options) {
    fabric.Image.fromURL(
      url,
      img => {
        img.set(options);
        this.canvas.add(img);

        if (options.filter === "grayscale") {
          img.filters.push(new fabric.Image.filters.Grayscale());
          img.applyFilters();
        }
      },
      {
        crossOrigin: "Anonymous"
      }
    );
  }

  getSelected() {
    // console.log("active", this.canvas.getActiveObject());
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

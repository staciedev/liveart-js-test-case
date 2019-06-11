import DrawingObject from "./core/drawingObject";
import Text from "./core/text";
import Image from "./core/image";
import { Observable } from "rxjs";

export default interface GraphicConnector {
  selected$: Observable<DrawingObject>;
  deselected$: Observable<any>;

  addText(text: Text);

  updateText(text: Text, values: Object);

  addImage(image: Image);

  getSelected(): DrawingObject;

  removeSelected();

  moveSelectedToFront();

  moveSelectedToBack();
}

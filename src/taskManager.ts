import Text from "./core/text";
import Image from "./core/image";
import iGraphicConnector from "./iGraphicConnector";
import Collection from "./core/collection";

export default class TaskManager {
  private graphicConnector: iGraphicConnector;
  private collection;

  public selected$;
  public deselected$;

  constructor(graphicConnector: iGraphicConnector) {
    this.graphicConnector = graphicConnector;
    this.selected$ = this.graphicConnector.selected$;
    this.deselected$ = this.graphicConnector.deselected$;
    this.collection = new Collection();
  }

  addText(text: Text) {
    this.collection.add(text);
    this.graphicConnector.addText(text);
  }

  editText(id: number, newValues: object) {
    let item = this.collection.getById(id);
    if (item) {
      item.update(newValues);
    }
    this.graphicConnector.updateText(item, newValues);
  }

  removeSelected() {
    let selected = this.graphicConnector.getSelected(); // TODO: use selected$ instead
    this.collection.remove(selected);
    this.graphicConnector.removeSelected();
  }

  moveSelectedToFront() {
    let selected = this.graphicConnector.getSelected();
    this.collection.moveToFront(selected);
    this.graphicConnector.moveSelectedToFront();
  }

  moveSelectedToBack() {
    let selected = this.graphicConnector.getSelected();
    this.collection.moveToBack(selected);
    this.graphicConnector.moveSelectedToBack();
  }
}

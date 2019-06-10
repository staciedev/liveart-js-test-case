import Text from "./core/text";
import Image from "./core/image";
import FabricManager from "./fabricManager";
import Collection from "./core/collection";

export default class TaskManager {
  private fabricManager: FabricManager;
  private collection;

  constructor(fabricManager: FabricManager) {
    this.fabricManager = fabricManager;
    this.collection = new Collection();
  }

  addText(text: Text) {
    this.collection.add(text);
    this.fabricManager.addText(text);
  }

  removeSelected() {
    let selected = this.fabricManager.getSelected(); // TODO: subscribe to changes?
    this.collection.remove(selected);
    this.fabricManager.removeSelected();
  }

  moveSelectedToFront() {
    let selected = this.fabricManager.getSelected();
    this.collection.moveToFront(selected);
    this.fabricManager.moveSelectedToFront();
  }

  moveSelectedToBack() {
    let selected = this.fabricManager.getSelected();
    this.collection.moveToBack(selected);
    this.fabricManager.moveSelectedToBack();
  }
}
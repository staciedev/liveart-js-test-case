import Vue from "vue";
import App from "./App.vue";
import TaskManager from "./taskManager";
import FabricConnector from "./fabricConnector";
import Text from "./core/text";
import { fabric } from "fabric";

/**
 * Root class with the stub data
 */

//#region Main Application Parts
//1. UI interface
const viewModel = new Vue(App).$mount("#app");
//2. Task manager
const manager = new TaskManager(new FabricConnector());
//#endregion

//#region work with UI
//send data to UI ()
viewModel.setData({
  selectedText: {
    text: "I'm red texts",
    font: "first_font",
    color: "#FF0000"
  }
});

//listen data from UI
viewModel.$on("buttonClick", function(event: string) {
  console.log("Clicked buttons:", event);
  switch (event) {
    case "delete":
      manager.removeSelected();
      break;

    case "toFront":
      manager.moveSelectedToFront();
      break;

    case "toBack":
      manager.moveSelectedToBack();
      break;
    default:
      console.log("Clicked buttons:", event);
  }
});

viewModel.$on("addText", function(value) {
  manager.addText(new Text(value.text, value.color, value.font));
});
//#endregion

//#region work with canvas
// manager.addImage(
//   "https://live.staticflickr.com/5031/7430761556_c3e7b6c321_m.jpg",
//   { left: 10, top: 10 }
// );
// manager.addImage(
//   "https://live.staticflickr.com/7039/6835581528_e747fd91fe_q.jpg",
//   { left: 210, top: 90, filter: "grayscale" }
// );

manager.addText(new Text("I'm green text", "#009900", ""));
//#endregion

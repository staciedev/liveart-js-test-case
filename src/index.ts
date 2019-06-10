import Vue from "vue";
import App from "./App.vue";
import DesignerCanvas from "./designerCanvas";
import { fabric } from "fabric";

/**
 * Root class with the stub data
 */

//#region Main Application Parts
//1. UI interface
const viewModel = new Vue(App).$mount("#app");
//2. Canvas
const designerCanvas = new DesignerCanvas();
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
viewModel.$on("buttonClick", function(event) {
  console.log("Clicked buttons:", event);
});

viewModel.$on("addText", function(value) {
  designerCanvas.canvas.add(
    new fabric.Text(value.text, {
      fill: value.color
    })
  );
});
//#endregion

//#region work with canvas
designerCanvas.addPhoto(
  "https://live.staticflickr.com/5031/7430761556_c3e7b6c321_m.jpg",
  { left: 10, top: 10 }
);
designerCanvas.addPhoto(
  "https://live.staticflickr.com/7039/6835581528_e747fd91fe_q.jpg",
  { left: 210, top: 90, filter: "grayscale" }
);

designerCanvas.canvas.add(
  new fabric.Text("I'm green text", {
    fill: "#009900",
    left: 10,
    top: 300
  })
);
//#endregion

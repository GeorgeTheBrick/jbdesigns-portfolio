import * as model from "./memoryModel.js";
import memoryView from "./memoryView.js";
import mainView from "../../main/js/mainView.js";
import { controlNavi } from "../../navi/js/naviController.js";

export const controlMemory = function () {
  memoryView.render(model.randomArray());
  memoryView.addHandlerRenderNewMemory(controlMemory);
  memoryView.addHandlerReveal(model.reveal);
  memoryView.addHandlerCloseMemory(controlClose);
};

const controlClose = function () {
  mainView.render();
  mainView.addHandlerRenderMemory(controlMemory);
  mainView.addHandlerRenderNavi(controlNavi);
};

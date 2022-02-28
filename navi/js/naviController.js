import * as model from "./naviModel.js";
import naviView from "./naviView.js";
import mainView from "../../main/js/mainView.js";
import { controlMemory } from "../../memory/js/memoryController.js";
import "regenerator-runtime/runtime";

export const controlNavi = async function () {
  try {
    const coords = await model.getPosition();
    const date = model.displayDate();

    naviView.render();
    naviView.loadMap(coords, date);
    naviView.addHandlerClickMap();
    naviView.addHandlerSubmit();
    naviView.addHandlerCloseNavi(controlClose);
    naviView.addHandlerRemoveEntry();
    naviView.addHandlerClickEntry();
  } catch (err) {
    console.error(err);
  }
};

const controlClose = function () {
  mainView.render();
  mainView.addHandlerRenderNavi(controlNavi);
  mainView.addHandlerRenderMemory(controlMemory);
};

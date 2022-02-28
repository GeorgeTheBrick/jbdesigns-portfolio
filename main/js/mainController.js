import { controlMemory } from "../../memory/js/memoryController.js";
import { controlNavi } from "../../navi/js/naviController.js";
import mainView from "./mainView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const memoryInit = function () {
  mainView.addHandlerRenderMemory(controlMemory);
};

const naviInit = function () {
  mainView.addHandlerRenderNavi(controlNavi);
};

const init = function () {
  mainView.addHandlerMobileNav();
  mainView.addHandlerSmoothScroll();
  mainView.renderStickyNav();
  mainView.addAccordionHandler();
  mainView.renderCopyrightDate();
};
init();
memoryInit();
naviInit();

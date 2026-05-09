import { loadLearningState, resetVisualState } from "./engine/state.js";
import { bindStaticEvents, render } from "./engine/render.js";

loadLearningState();
resetVisualState();
bindStaticEvents();
render();

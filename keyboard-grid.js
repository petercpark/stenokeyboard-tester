import STENO_KEY_CHART from "./script.js";

//prettier-ignore
const UNUSED_KEYS = new Set(["Fn","#3","#4","#5","#6","res1","res2","pwr","#7","#8","#9","#A","#B","#C"]);
let steno_keys = STENO_KEY_CHART.filter((x) => !UNUSED_KEYS.has(x));

//display keyboard
const keyboard_grid = document.querySelector("#keyboard-grid");

steno_keys.forEach((key) => {
  keyboard_grid.innerHTML +=
    '<div class="key" id="key-' + key.replace("#", "") + '">' + key + "</div>";
});

import { initListeners } from "./initVariables.js";

window.skipToNext = false;
window.travellingDirection = "";
window.locationOfBus = "";
window.theTime = "";
window.messageArea = document.querySelector(".message-area");
window.infoLine = document.getElementById("info");

const getButtonWork = document.querySelector(".to-work");
const getButtonHome = document.querySelector(".to-home");
const mapPic = document.querySelector(".map-pic");

initListeners(
    infoLine,
    mapPic,
    travellingDirection,
    getButtonHome,
    getButtonWork
);

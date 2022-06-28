export let travellingDirection = "";

let skipToNext = false;

let locationOfBus;

let theTime;

const messageArea = document.querySelector(".message-area");

const getButtonWork = document.querySelector(".to-work");

const getButtonHome = document.querySelector(".to-home");

const infoLine = document.getElementById("info");

const mapPic = document.querySelector(".map-pic");

mapPic.addEventListener("click", () => {
    infoLine.textContent = "Not that one...";
    setTimeout(function () {
        infoLine.textContent = "Tap one of the buses at the bottom...";
    }, 4000);
});

getButtonWork.addEventListener("click", () => {
    travellingDirection = "INBOUND";
    wheresMySixty();
});

getButtonHome.addEventListener("click", () => {
    travellingDirection = "OUTBOUND";
    wheresMySixty();
});

export * { all };

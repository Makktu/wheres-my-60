import { wheresMySixty } from "./busLocation.js";

const initListeners = (
    infoLine,
    mapPic,
    travellingDirection,
    getButtonHome,
    getButtonWork
) => {
    mapPic.addEventListener("click", () => {
        infoLine.textContent = "Not that one...";
        setTimeout(function () {
            infoLine.textContent = "Tap one of the buses at the bottom...";
        }, 4000);
    });

    getButtonWork.addEventListener("click", () => {
        travellingDirection = "INBOUND";
        wheresMySixty(travellingDirection);
    });

    getButtonHome.addEventListener("click", () => {
        travellingDirection = "OUTBOUND";
        wheresMySixty(travellingDirection);
    });
};

export { initListeners };

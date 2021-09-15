"use strict";

function wheresMySixty() {
    window.open(
        "https://www.stagecoachbus.com/routes/midlands/60/warwick-university-arena-retail-park/xlao060.i"
    );
    // messageArea.textContent = "Pressed OK";
    // setTimeout(function () {
    //     messageArea.textContent = "";
    // }, 5000);
}

const messageArea = document.querySelector(".message-area");

const getButton = document.querySelector(".get-btn");

getButton.addEventListener("click", wheresMySixty);

// https://www.stagecoachbus.com/routes/midlands/60/warwick-university-arena-retail-park/xlao060.i

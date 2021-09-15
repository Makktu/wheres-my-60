"use strict";

function wheresMySixty() {
    messageArea.textContent = "Pressed OK";
    setTimeout(function () {
        messageArea.textContent = "";
    }),
        50000;
}

const messageArea = document.querySelector(".message-area");

const getButton = document.querySelector(".get-btn");

getButton.addEventListener("click", wheresMySixty);

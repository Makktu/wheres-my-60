"use strict";

function wheresMySixty() {
    console.log("Starting...");
    fetch(
        "https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744"
    )
        .then((response) => response.text())
        .then((data) => console.log(data));
    // let newRequest = fetch(
    //     "https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744",
    //     { mode: "no-cors" }
    // );
    // console.log(newRequest);
    // let request = new XMLHttpRequest();
    // request.open(
    //     "GET",
    //     "https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744",
    //     { mode: "no-cors" }
    // );
    // request.send();
    // request.onload = function () {
    //     console.log(request.status);
    // };
}

const messageArea = document.querySelector(".message-area");

const getButton = document.querySelector(".get-btn");

getButton.addEventListener("click", wheresMySixty);

// https://www.stagecoachbus.com/routes/midlands/60/warwick-university-arena-retail-park/xlao060.i

// datafeed:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744

// or:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/

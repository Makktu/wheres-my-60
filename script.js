"use strict";

function wheresMySixty() {
    console.log("Starting...");
    const url =
        "https://cors-anywhere.herokuapp.com/https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => console.log(data));
}

const messageArea = document.querySelector(".message-area");

const getButton = document.querySelector(".get-btn");

getButton.addEventListener("click", wheresMySixty);

// https://www.stagecoachbus.com/routes/midlands/60/warwick-university-arena-retail-park/xlao060.i

// datafeed:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744

// or:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/

// OR EVEN:

// https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60

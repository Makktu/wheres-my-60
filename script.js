"use strict";

function printLoc(addr) {
    let newAddr = JSON.parse(addr);
    infoLine.textContent = `Your 60 is at ${newAddr.data[0].name}`;
}

function displayMap(lat, lon, time) {
    messageArea.innerHTML = `<iframe width="320" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
        lon - 0.0015
    }%2C${lat - 0.0015}%2C${lon + 0.0015}%2C${
        lat + 0.0015
    }&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=52.38792&amp;mlon=-1.46105#map=18/52.38792/-1.46105">View Larger Map</a></small>`;
}

function parseData(data) {
    console.log(data);
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log("1", jsonData);
    console.log("2", allBuses);

    for (let bus in allBuses) {
        if (
            allBuses[bus].MonitoredVehicleJourney.DirectionRef ===
            travellingDirection
        ) {
            let lat =
                allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude;
            let lon =
                allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude;
            let time = allBuses[bus].RecordedAtTime;
            displayMap(lat, lon, time);
            fetch(
                `http://api.positionstack.com/v1/reverse?access_key=0cfcfb7d42c2c2f3e7b21223952129ef&query=${lat},${lon}&output=json&limit=1`
            )
                .then((response) => response.text())
                .then((addr) => printLoc(addr));
            return;
        }
    }
}

function wheresMySixty() {
    messageArea.textContent = "SEARCHING...";
    messageArea.style = "color: yellow;";
    const url =
        "https://cors.bridged.cc/https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => parseData(data));
}
let travellingDirection = "";

const messageArea = document.querySelector(".message-area");

const getButtonWork = document.querySelector(".to-work");

const getButtonHome = document.querySelector(".to-home");

const infoLine = document.querySelector(".info");

getButtonWork.addEventListener("click", () => {
    travellingDirection = "INBOUND";
    wheresMySixty();
});

getButtonHome.addEventListener("click", () => {
    travellingDirection = "OUTBOUND";
    wheresMySixty();
});

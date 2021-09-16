"use strict";

function parseData(data) {
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log(allBuses);

    let location = "";

    // get times of recording
    for (let bus in allBuses) {
        let lat =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude;
        let lon =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude;
        let time = allBuses[bus].RecordedAtTime;
        console.log(lat, lon, time);
        fetch(
            `http://api.positionstack.com/v1/reverse?access_key=0cfcfb7d42c2c2f3e7b21223952129ef&query=${lat},${lon}`
        )
            .then((response) => response.text())
            .then((addr) => (location += addr.street + "///"));
        // location += addr.street + "///";
    }
    console.log(location);
}

function wheresMySixty() {
    console.log("Starting...");
    const url =
        "https://cors.bridged.cc/https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => parseData(data));
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

// positionstack API : 0cfcfb7d42c2c2f3e7b21223952129ef

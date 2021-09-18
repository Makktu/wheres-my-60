"use strict";

function parseData(data) {
    console.log(data);
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log(allBuses);

    let location = "";

    // get locations and times of recording
    for (let bus in allBuses) {
        let lat =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude;
        let lon =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude;
        let time = allBuses[bus].RecordedAtTime;
        console.log(lat, lon, time);
        window.open(`http://www.google.com/maps/place/${lat},${lon}`);

        fetch(
            `http://api.positionstack.com/v1/reverse?access_key=0cfcfb7d42c2c2f3e7b21223952129ef&query=${lat},${lon}&output=json&limit=1`
        )
            .then((response) => response.text())
            .then((addr) => console.log(addr));
        // location += addr.street + "///";
    }
    console.log(location);
    // messageArea.textContent = location;
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

// TOP-LEFT: 52.45543, -1.58546
// TOP-RIGHT: 52.45649, -1.42625
// BOTTOM-LEFT: 52.36964, -1.59502
// BOTTOM-RIGHT: 52.38044, -1.42509

// QUERY:
// -1.42625, 52.36964, -1.59502, 52.45649

// 52.3843575 -1.5671809

// parse this!

// {"data":[{"latitude":52.443951,"longitude":-1.491083,"type":"venue","distance":0.062,"name":"Tesco Ricoh Arena","number":null,"postal_code":null,"street":null,"confidence":0.8,"region":"West Midlands","region_code":null,"county":"Coventry","locality":"Coventry","administrative_area":null,"neighbourhood":null,"country":"United Kingdom","country_code":"GBR","continent":"Europe","label":"Tesco Ricoh Arena, Coventry, England, United Kingdom"}]}

// this is the URL to adapt:

// * http://www.google.com/maps/place/${lat},${lon}

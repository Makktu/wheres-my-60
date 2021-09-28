"use strict";

function assessTime() {
    let rightNow = new Date();
    rightNow = rightNow.getHours();
    return rightNow;
}

function printLoc(addr) {
    let newAddr = JSON.parse(addr);
    console.log(newAddr);
    let locationOfBus = newAddr.data[0].name;
    infoLine.textContent = `Your 60 is at: ${locationOfBus}`;
}

function displayMap(lat, lon, time) {
    let theTime = time.substring(
        time.lastIndexOf("T") + 1,
        time.lastIndexOf("+") - 3
    );
    let theHour = parseInt(theTime.substring(0, 2)) + 1;
    if (assessTime() - theHour > 1) {
        console.log("CONDITION HIT LINE 22");
        return;
    }
    if (assessTime() >= 21 || assessTime() <= 5) {
        infoLine.textContent = "The 60 is not running at this time";
        messageArea.innerHTML =
            "<div class='map-pic'><img src='img/map-pic.png' /></div>";
        return;
    }

    theTime = theHour.toString() + theTime.substring(2);
    infoLine.textContent = `At ${theTime} your 60 ${
        travellingDirection === "INBOUND" ? "to work " : "home "
    } is here:`;

    messageArea.innerHTML = "";
    messageArea.innerHTML = `<iframe width="320" height="390" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
        lon - 0.001
    }%2C${lat - 0.001}%2C${lon + 0.001}%2C${
        lat + 0.001
    }&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" style="border: 1px solid black"></iframe>`;
}

function parseData(data) {
    console.log(data);
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log("1", jsonData);
    console.log("2", allBuses);

    for (let bus in allBuses) {
        console.log(
            bus,
            allBuses[bus].MonitoredVehicleJourney.DirectionRef,
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude,
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude,
            allBuses[bus].RecordedAtTime
        );
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
            // fetch(
            //     `http://api.positionstack.com/v1/reverse?access_key=0cfcfb7d42c2c2f3e7b21223952129ef&query=${lat},${lon}&output=json&limit=1`
            // )
            //     .then((response) => response.text())
            //     .then((addr) => printLoc(addr));
            // testFunc(lat, lon);
            // fetch(
            //     `https://maps.googleapis.com/maps/api/geocode/JSON?latlng=${lat}, ${lon}&key=AIzaSyBYSkrqigkGOs0NMyMz21huI3opYdANXZQ`
            // )
            //     .then((response) => response.text())
            //     .then((addr) => printLoc(addr));

            return;
        }
    }
}

function wheresMySixty() {
    infoLine.textContent = "";
    messageArea.style = "font-size: 2.5rem;";
    messageArea.innerHTML =
        '<br><br><i class="fas fa-spinner fa-spin fa-3x fa-fw"></i>';
    const url =
        "https://cors.bridged.cc/https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => parseData(data));

    setTimeout(function () {
        if (!infoLine.textContent) {
            infoLine.textContent =
                "This is taking too long. There may be a problem.";
        }
    }, 8000);
}

let travellingDirection = "";

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

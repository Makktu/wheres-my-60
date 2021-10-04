"use strict";

function loadCSS() {
    let darkMode = document.getElementById("dark-mode");
    if (!darkMode) {
        document
            .getElementsByTagName("head")[0]
            .insertAdjacentHTML(
                "beforeend",
                "<link id='dark-mode' rel='stylesheet' href='darkcss.css' />"
            );
        toggleDark.innerHTML =
            "<i id='toggle-colors' class='fas fa-toggle-on'></i>";
    } else {
        darkMode.parentNode.removeChild(darkMode);
        toggleDark.innerHTML =
            "<i id='toggle-colors' class='fas fa-toggle-off'></i>";
    }
}

function assessTime() {
    let rightNow = new Date();
    rightNow = rightNow.getHours();
    return rightNow;
}

function printLoc(lat, lon) {
    let places;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            places = JSON.parse(this.responseText);
            console.log(places);
            if (places.address.road) {
                locationOfBus = `${places.address.road}, ${places.address.suburb}`;
            } else if (places.address.suburb) {
                locationOfBus = `${places.address.suburb}`;
            } else {
                locationOfBus = null;
            }

            if (locationOfBus) {
                if (locationOfBus.length > 29) {
                    locationOfBus = locationOfBus.substring(0, 29);
                }
                infoLine.textContent = `At ${theTime}, ${locationOfBus}`;
            } else {
                infoLine.textContent = `At ${theTime} your 60 ${
                    travellingDirection === "INBOUND" ? "to work " : "home "
                } is here:`;
            }
        }
    };
    xhttp.open(
        "GET",
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        true
    );
    xhttp.send();
}

function displayMap(lat, lon, time) {
    theTime = time.substring(
        time.lastIndexOf("T") + 1,
        time.lastIndexOf("+") - 3
    );
    let theHour = parseInt(theTime.substring(0, 2)) + 1;

    if (assessTime() >= 21 || assessTime() <= 5) {
        infoLine.textContent = "The 60 is not running at this time";
        messageArea.innerHTML =
            "<div class='map-pic'><img src='img/newer-map-pic.png' /></div>";
        return;
    }
    if (assessTime() - theHour > 1 || theHour > assessTime()) {
        if (!skipToNext) {
            skipToNext = true;
            wheresMySixty();
        }
        return;
    }

    theTime = theHour.toString() + theTime.substring(2);
    printLoc(lat, lon);

    messageArea.innerHTML = "";
    messageArea.innerHTML = `<iframe width="340" height="420" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
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
            if (!skipToNext) {
                displayMap(lat, lon, time);
            } else {
                skipToNext = false;
                continue;
            }
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

let skipToNext = false;

let locationOfBus;

let theTime;

const toggleDark = document.getElementById("toggle-colors");

toggleDark.innerHTML = "<i class='fas fa-toggle-off'></i>";

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

toggleDark.addEventListener("click", loadCSS);

getButtonWork.addEventListener("click", () => {
    travellingDirection = "INBOUND";
    wheresMySixty();
});

getButtonHome.addEventListener("click", () => {
    travellingDirection = "OUTBOUND";
    wheresMySixty();
});

const apiToken = config.MY_API_TOKEN;
const key = config.SECRET_API_KEY;

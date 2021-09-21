"use strict";

function displayMap() {
    let lat = 52.38857572521704; // 52.38937773625854
    let lon = -1.462076773668885; // -1.4575123786926272
    let time = "15:14:32";
    // messageArea.classList.add("expand");
    // infoLine.innerText = `At ${time} your 60 is here:`;
    messageArea.innerHTML = `<iframe width="320" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-1.464309096336365%2C52.38675529520704%2C-1.4572280645370486%2C52.389665835140555&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=52.38792&amp;mlon=-1.46105#map=18/52.38792/-1.46105">View Larger Map</a></small>`;
    messageArea.style.cssText = "transition: 2s ease;";

    // lon-0.01 / lat + 0.01

    // 52.38857572521704, -1.462076773668885

    //<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-1.4639979600906374%2C52.38671928057508%2C-1.4569169282913208%2C52.38962982288314&amp;layer=mapnik&amp;marker=52.38817621269286%2C-1.460457444190979" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=52.38818&amp;mlon=-1.46046#map=18/52.38817/-1.46046">View Larger Map</a></small>
}

function parseData(data) {
    displayMap();
    return;
    console.log(data);
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log(jsonData);
    console.log(allBuses);

    let location = "";

    // get locations and times of recording
    for (let bus in allBuses) {
        // console.log(`-----${bus}: `, allBuses[bus]);
        console.log(allBuses[bus].MonitoredVehicleJourney.DirectionRef);
        console.log(allBuses[bus].MonitoredVehicleJourney.Bearing);
        console.log(allBuses[bus].MonitoredVehicleJourney.DestinationRef);

        let lat =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude;
        let lon =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude;
        let time = allBuses[bus].RecordedAtTime;
        console.log(lat, lon, time);
        // window.open(`http://www.google.com/maps/place/${lat},${lon}`);

        fetch(
            `http://api.positionstack.com/v1/reverse?access_key=0cfcfb7d42c2c2f3e7b21223952129ef&query=${lat},${lon}&output=json&limit=1`
        )
            .then((response) => response.text())
            .then((addr) => console.log(addr));
        // .then((addr) => console.log(addr.latitude));
        // location += addr.street + "///";
    }
    console.log(location);
    //     // messageArea.textContent = location;

    // let lat = 53;
    // let lon = -1;

    // updateMap(lat, lon);
}

function wheresMySixty() {
    console.log("Starting...");
    messageArea.textContent = "SEARCHING...";
    messageArea.style = "color: yellow;";
    const url =
        "https://cors.bridged.cc/https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => parseData(data));
}

const messageArea = document.querySelector(".message-area");

const getButtonWork = document.querySelector(".to-work");

// const infoLine = document.querySelector(".info-line");

getButtonWork.addEventListener("click", wheresMySixty);

// https://www.stagecoachbus.com/routes/midlands/60/warwick-university-arena-retail-park/xlao060.i

// datafeed:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/?api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744

// or:
// https://data.bus-data.dft.gov.uk/api/v1/datafeed/1696/

// OR EVEN:

// https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60

import { displayMap } from "./displayMap.js";

function wheresMySixty(travellingDirection) {
    infoLine.textContent = "";
    messageArea.style = "font-size: 2.5rem;";
    messageArea.innerHTML =
        '<br><br><i class="fas fa-spinner fa-spin fa-3x fa-fw"></i>';
    const url =
        "https://api.codetabs.com/v1/proxy?quest=https://data.bus-data.dft.gov.uk/api/v1/datafeed?boundingBox=-1.42625%2C%2052.36964%2C%20-1.59502%2C%2052.45649&operatorRef=SCNH&lineRef=60&api_key=93b0e2fee16e881a1ccd4a49736d71c44b376744";
    fetch(url)
        .then((response) => response.text())
        .then((data) => parseData(data, travellingDirection));

    setTimeout(function () {
        if (!infoLine.textContent) {
            infoLine.textContent = "There may be a problem. Reloading...";
            console.log("131");

            setTimeout(function () {
                if (
                    infoLine.textContent ===
                    "There may be a problem. Reloading..."
                ) {
                    location.reload();
                }
            }, 2000);
        }
    }, 8000);
}

function parseData(data, travellingDirection) {
    const jsonData = xmlToJson.parse(data);
    const allBuses =
        jsonData.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
    console.log("1", jsonData);
    console.log("2", allBuses);

    for (let bus in allBuses) {
        console.log(travellingDirection);
        console.log(
            bus,
            allBuses[bus].MonitoredVehicleJourney.DirectionRef,
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude,
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude,
            allBuses[bus].RecordedAtTime
        );
        let lat =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Latitude;
        let lon =
            allBuses[bus].MonitoredVehicleJourney.VehicleLocation.Longitude;
        let time = allBuses[bus].RecordedAtTime;
        if (
            allBuses[bus].MonitoredVehicleJourney.DirectionRef ===
            travellingDirection
        ) {
            if (
                lat > 52.4072268987048 &&
                travellingDirection === "INBOUND" &&
                skipToNext
            ) {
                infoLine.textContent = "No 60 in range yet. Check back soon.";
                break;
            }

            if (lat > 52.4072268987048 && travellingDirection === "INBOUND") {
                skipToNext = true;
                continue;
            }
            console.log("PIOUFIYFIYD");

            displayMap(lat, lon, time);
            break;
        }
    }
}

export { wheresMySixty, parseData };
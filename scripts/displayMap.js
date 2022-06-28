import { assessTime } from "./getTime.js";

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
                infoLine.textContent = `${locationOfBus} (${theTime})`;
            }
        }
    };
    xhttp.open(
        "GET",
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        true
    );
    xhttp.send();
}

function displayMap(lat, lon, time) {
    console.log("🙋🏽‍♀️🙋🏽‍♀️🙋🏽‍♀️🙋🏽‍♀️");
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

    theTime = theHour.toString() + theTime.substring(2);
    printLoc(lat, lon);

    infoLine.textContent = `At ${theTime} your 60 ${
        travellingDirection === "INBOUND" ? "to work " : "home "
    } is here:`;

    messageArea.innerHTML = "";

    // ********************************

    messageArea.innerHTML = `<iframe width="340" height="420" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
        lon - 0.001
    }%2C${lat - 0.001}%2C${lon + 0.001}%2C${
        lat + 0.001
    }&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" style="border: 1px solid black"></iframe>`;
}

export { displayMap };

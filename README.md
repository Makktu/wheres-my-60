# WHERE'S MY 60?

# The most simple bus-tracking webapp possible!

This one-page webapp will be designed to perform just one task: to track the current location of the Stagecoach no. 60 bus service from Warwick University to Arena Park.

### 21 Sept 2021

Finally got the map to display with the location (plus marker) of 'a bus', but it's rarely the actual 60 bus that the user is waiting for. Need to interrogate the API data some more and refine the selection. Possibly have to dabble with location info. Don't want to though as the idea is that this webapp stays as simple and out-of-the-way as possible. Anything that bothers the user has to go, and being nagged by the device for location permission is one of the prime bothers.

22-Sep-2021: currently adding a timecheck

next on the list of things to add:

-   Somehow getting around the restrictions with Positionstack's basic API to allow posting the streetname where the bus is
-   (MOST IMPORTANT) – reliably getting the actual next bus that the user is waiting for. Currently as of this date it is only about 80% reliable. Must be 100%
-   calculate whether or not the stagecoach API is down for some reason (it is down at least one day per week) and informing the user. Probably simple enough with a timecheck. If the time isn't right now, or at least within the last hour, the API must be down.

29 Sep 2021: made new branch 'enhanced locations' to work on making the 95% accurate app 100% accurate.

Other things to add here include:

-   Media query to show different display on Web – at the moment this is a mobile first app. The web version looks neglected because it is. This will be the last thing added on the app.

01-Oct-2021

-   Fixed the problem where the app would display outdated data from the Stagecoach API. E.g. showing the last bus on the route from the night before, rather than the most recent bus today (because Stagecoach don't reliably update their API). Added a 'skip' section of code to recognise when this has happened and simply move onto the next bus. This is now working, hopefully reliably – and hopefully hasn't broken something else. Testing needed over the next couple of days' use of the app myself.

4 October 2021

Started new branch, Location, where I will work on the streetname aspect.

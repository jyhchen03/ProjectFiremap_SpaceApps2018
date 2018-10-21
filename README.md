# Project-Firemap
Built during the NASA/CSA 2018 Space Apps Hackathon

This is a web-based interactive map that displays regions of potential risk for wildfires with user interaction.

To calculate the risk of a wildfire in a specified area, we used the coordinates of the location to pull data from OpenWeatherMap API.
We applied this information into the following formula:

*10 * exp(ln2 - 0.45 - 0.0345 * relative_humidity + 0.0338 x temp + 0.0234 * wind_speed)*

to get the approximate McArthur Forest Fire Danger Index using the available data provided.
This Fire Danger Index (FDI) is translated into a colour gradient on the interactive map.

Buttons on the bottom of the map allow the geography to shift to the different continents of the world. 
A simple click on the map will pull the data for the corresponding location in the world and output the Fire Danger Index.

Further iterations of the map will include a button on the top that will link to a second map that will outsource the map to the public.
In this second version, people will be able to submit sightings of fires in the world and this will be displayed on our primary map.

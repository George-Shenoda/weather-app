import { Search } from "../interfaces/interfaces";

export function createSearch(urlParams: Search) {
    let url =
        "https://api.open-meteo.com/v1/forecast?latitude=51.5,30.0626,42.8333,51.5085,37.7749&longitude=10.5,31.2497,12.8333,-0.1257,-122.4194&current=";
    url += urlParams.current;
    url += "&daily=";
    url += urlParams.daily;
    url += "&hourly=";
    url += urlParams.hourly;
    url += "&temperature_unit=";
    url += urlParams.units.temp;
    url += "&wind_speed_unit=";
    url += urlParams.units.speed;
    url += "&precipitation_unit=";
    url += urlParams.units.length;
    return url;
}

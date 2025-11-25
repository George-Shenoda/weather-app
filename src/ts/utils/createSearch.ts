import { Search } from "../interfaces/interfaces";

export function createSearch(urlParams: Search) {
    let url =
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=";
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
    console.log(url);
    return url;
}

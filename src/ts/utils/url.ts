import { Search } from "../interfaces/interfaces";

export const urlParams: Search = {
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    hourly: "temperature_2m,weather_code",
    current:
        "temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code",
    units: {
        temp: "celsius",
        speed: "kmh",
        length: "mm",
    },
};

export interface Units {
    temp: string;
    speed: string;
    length: string;
}

export interface Search {
    readonly daily: string;
    readonly hourly: string;
    readonly current: string;
    units: Units;
}

//https://api.open-meteo.com/v1/forecast?latitude=30.0626&longitude=31.2497&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code&timezone=GMT

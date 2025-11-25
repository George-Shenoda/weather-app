export interface Units {
    temp: string;
    speed: string;
    length: string;
}

export const city = "Egypt";

export interface Search {
    readonly daily: string;
    readonly hourly: string;
    readonly current: string;
    units: Units;
}

export interface Data {
    current: {
        precipitation: number;
        relative_humidity_2m: number;
        temperature_2m: number;
        weather_code: number;
        wind_speed_10m: number;
        apparent_temperature: number;
        time: Date;
    };
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        time: Date[];
        weather_code: number[];
    };
    hourly: {
        temperature_2m: number[];
        time: Date[];
        weather_code: number[];
    };
    latitude: number;
    longitude: number;
}

export interface Location {
    Egypt: Data;
    Germany: Data;
    Italy: Data;
    London: Data;
    "San Francisco": Data;
}

enum WeatherCode {
    ClearSky = 0,
    MainlyClear = 1,
    PartlyCloudy = 2,
    Overcast = 3,
    Fog = 45,
    DepositingRimeFog = 48,
    LightDrizzle = 51,
    ModerateDrizzle = 53,
    DenseDrizzle = 55,
    LightFreezingDrizzle = 56,
    DenseFreezingDrizzle = 57,
    SlightRain = 61,
    ModerateRain = 63,
    HeavyRain = 65,
    LightFreezingRain = 66,
    HeavyFreezingRain = 67,
    SlightSnowFall = 71,
    ModerateSnowFall = 73,
    HeavySnowFall = 75,
    SnowGrains = 77,
    SlightRainShowers = 80,
    ModerateRainShowers = 81,
    ViolentRainShowers = 82,
    SlightSnowShowers = 85,
    HeavySnowShowers = 86,
    Thunderstorm = 95,
    ThunderstormWithSlightHail = 96,
    ThunderstormWithHeavyHail = 99,
}

interface WeatherImageMap {
    [key: number]: string;
}

export const weatherImages: WeatherImageMap = {
    [WeatherCode.ClearSky]: "assets/images/icon-sunny.webp",
    [WeatherCode.MainlyClear]: "assets/images/icon-sunny.webp",
    [WeatherCode.PartlyCloudy]: "assets/images/icon-partly-cloudy.webp",
    [WeatherCode.Overcast]: "assets/images/icon-overcast.webp",
    [WeatherCode.Fog]: "assets/images/icon-fog.webp",
    [WeatherCode.DepositingRimeFog]: "assets/images/icon-fog.webp",
    [WeatherCode.LightDrizzle]: "assets/images/icon-drizzle.webp",
    [WeatherCode.DenseDrizzle]: "assets/images/icon-drizzle.webp",
    [WeatherCode.ModerateDrizzle]: "assets/images/icon-drizzle.webp",
    [WeatherCode.LightFreezingDrizzle]: "assets/images/icon-drizzle.webp",
    [WeatherCode.DenseFreezingDrizzle]: "assets/images/icon-drizzle.webp",
    [WeatherCode.SlightRain]: "assets/images/icon-rain.webp",
    [WeatherCode.ModerateRain]: "assets/images/icon-rain.webp",
    [WeatherCode.HeavyRain]: "assets/images/icon-rain.webp",
    [WeatherCode.LightFreezingRain]: "assets/images/icon-rain.webp",
    [WeatherCode.HeavyFreezingRain]: "assets/images/icon-rain.webp",
    [WeatherCode.SlightRainShowers]: "assets/images/icon-rain.webp",
    [WeatherCode.ModerateRainShowers]: "assets/images/icon-rain.webp",
    [WeatherCode.ViolentRainShowers]: "assets/images/icon-rain.webp",
    [WeatherCode.SlightSnowFall]: "assets/images/icon-snow.webp",
    [WeatherCode.ModerateSnowFall]: "assets/images/icon-snow.webp",
    [WeatherCode.HeavySnowFall]: "assets/images/icon-snow.webp",
    [WeatherCode.SnowGrains]: "assets/images/icon-snow.webp",
    [WeatherCode.SlightSnowShowers]: "assets/images/icon-snow.webp",
    [WeatherCode.HeavySnowShowers]: "assets/images/icon-snow.webp",
    [WeatherCode.Thunderstorm]: "assets/images/icon-storm.webp",
    [WeatherCode.ThunderstormWithHeavyHail]: "assets/images/icon-storm.webp",
    [WeatherCode.ThunderstormWithSlightHail]: "assets/images/icon-storm.webp",
};

//https://api.open-meteo.com/v1/forecast?latitude=30.0626&longitude=31.2497&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code&timezone=GMT

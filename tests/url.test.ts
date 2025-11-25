import { describe, expect, it } from "vitest";
import { Search } from "../src/ts/interfaces/interfaces";
import { createSearch } from "../src/ts/utils/createSearch";

describe("Create Url", () => {
    it("Should return url", () => {
        const params: Search = {
            daily: "temperature_2m_max,temperature_2m_min,weather_code",
            hourly: "temperature_2m,weather_code",
            current:
                "temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,is_day",
            units: {
                temp: "f",
                speed: "g",
                length: "d",
            },
        };
        expect(createSearch(params)).toBe(
            `https://api.open-meteo.com/v1/forecast?latitude=51.5,30.0626,42.8333,51.5085,37.7749&longitude=10.5,31.2497,12.8333,-0.1257,-122.4194&current=${params.current}&daily=${params.daily}&hourly=${params.hourly}&temperature_unit=${params.units.temp}&wind_speed_unit=${params.units.speed}&precipitation_unit=${params.units.length}`,
        );
    });
});

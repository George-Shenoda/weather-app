import { Data, weatherImages } from "../interfaces/interfaces";
import { urlParams } from "./url";

export function updateContext(result: Data, city: string) {
    const current = document.querySelector(".current") as HTMLDivElement;
    const location = current.querySelector("h3") as HTMLHeadingElement;
    const time = current.querySelector(".time") as HTMLParagraphElement;
    const code = current.querySelector("img") as HTMLImageElement;
    const temp = current.querySelector(".temp i") as HTMLParagraphElement;

    location.innerText = city;
    time.innerText = `${result.current.time.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    })}`;
    temp.innerText = `${Math.floor(result.current.temperature_2m)}°`;
    code.src = weatherImages[result.current.weather_code];

    const details = document.querySelector(".details") as HTMLDivElement;
    const like = details.querySelector(".like .value") as HTMLParagraphElement;
    const humidity = details.querySelector(
        ".humidity .value",
    ) as HTMLParagraphElement;
    const speed = details.querySelector(
        ".speed .value",
    ) as HTMLParagraphElement;
    const length = details.querySelector(
        ".length .value",
    ) as HTMLParagraphElement;

    like.innerText = `${result.current.apparent_temperature}°`;
    humidity.innerText = `${result.current.relative_humidity_2m}%`;
    if (urlParams.units.speed === "kmh")
        speed.innerText = `${result.current.wind_speed_10m} km/h`;
    else
        speed.innerText = `${result.current.wind_speed_10m} ${urlParams.units.speed}`;
    length.innerText = `${result.current.precipitation} ${urlParams.units.length}`;
}

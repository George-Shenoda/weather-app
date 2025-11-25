import { Data, weatherImages } from "../interfaces/interfaces";

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
}

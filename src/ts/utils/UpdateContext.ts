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

    like.innerText = `${Math.floor(result.current.apparent_temperature)}°`;
    humidity.innerText = `${result.current.relative_humidity_2m}%`;
    if (urlParams.units.speed === "kmh")
        speed.innerText = `${result.current.wind_speed_10m} km/h`;
    else
        speed.innerText = `${result.current.wind_speed_10m} ${urlParams.units.speed}`;
    length.innerText = `${result.current.precipitation} ${urlParams.units.length}`;

    const daily = document.querySelector(".daily") as HTMLDivElement;
    const dayName = daily.querySelectorAll(
        ".dayName",
    ) as NodeListOf<HTMLParagraphElement>;
    const imgs = daily.querySelectorAll("img") as NodeListOf<HTMLImageElement>;
    const maxi = daily.querySelectorAll(
        ".max",
    ) as NodeListOf<HTMLParagraphElement>;
    const mins = daily.querySelectorAll(
        ".min",
    ) as NodeListOf<HTMLParagraphElement>;

    dayName.forEach((day, index) => {
        day.innerText = result.daily.time[index].toLocaleDateString("en-US", {
            weekday: "short",
        });
    });

    imgs.forEach((img, index) => {
        img.src = weatherImages[result.daily.weather_code[index]];
    });

    maxi.forEach((max, index) => {
        max.innerText = `${Math.floor(result.daily.temperature_2m_max[index])}°`;
    });

    mins.forEach((min, index) => {
        min.innerText = `${Math.floor(result.daily.temperature_2m_min[index])}°`;
    });

    const today = document.querySelector(
        ".rightContent button",
    ) as HTMLButtonElement;
    const p = today.querySelector("p") as HTMLParagraphElement;
    const lis = today.querySelectorAll("li a") as NodeListOf<HTMLLinkElement>;
    lis.forEach((li) => {
        let value =
            result.daily.time[0].getDay() -
            parseInt(li.dataset.value as string);
        if (value > 0) {
            value = 7 - value;
        } else {
            value = Math.abs(value);
        }
        li.dataset.today = `${value}`;
        if (today.dataset.done === "0") {
            if (li.dataset.today === "0") {
                p.innerText = li.innerText;
                console.log("default");
                updateDay(result);
                today.dataset.done = "1";
            }
        }
        li.addEventListener("click", (ev) => {
            ev.preventDefault(); // stop navigation / fragment change
            ev.stopPropagation();
            p.innerText = li.innerText;
            updateDay(result, parseInt(li.dataset.today as string));
        });
    });
}

function updateDay(result: Data, day: number = 0) {
    const code = document.querySelectorAll(
        ".rightContent  img",
    ) as NodeListOf<HTMLImageElement>;
    const hours = document.querySelectorAll(
        ".rightContent  .time",
    ) as NodeListOf<HTMLParagraphElement>;
    const temps = document.querySelectorAll(
        ".rightContent  .temp",
    ) as NodeListOf<HTMLParagraphElement>;

    for (let i = 0; i < 24; i++) {
        const idx = day * 24 + i;
        const rawHour = result.hourly.time[idx].getHours(); // 0..23
        const hour = rawHour % 12 || 12; // convert 0→12, 13→1, ...
        const ampm = rawHour >= 12 ? "PM" : "AM";
        hours[i].innerText = `${hour} ${ampm}`;
        code[i].src = weatherImages[result.hourly.weather_code[i * (day + 1)]];
        temps[i].innerText =
            `${Math.floor(result.hourly.temperature_2m[i * (day + 1)])}°`;
    }
}

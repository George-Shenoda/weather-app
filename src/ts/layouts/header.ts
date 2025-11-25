/* eslint-disable prefer-const */
import { switchUnit, SwitchUnits } from "../utils/switchUnits";
import { Units } from "../interfaces/interfaces";
import { urlParams } from "../utils/url";
import { fetchAPI } from "../utils/fetchAPI";
import { createSearch } from "../utils/createSearch";

const switchUnitsBtn = document.querySelector(".switch") as HTMLLinkElement;
const unitsValues = document.querySelectorAll(
    ".values",
) as NodeListOf<HTMLLinkElement>;

export let units: Units = {
    temp: "celsius",
    speed: "kmh",
    length: "mm",
};

const unitValue: {
    im: Units;
    me: Units;
} = {
    im: {
        temp: "fahrenheit",
        speed: "mph",
        length: "inch",
    },
    me: {
        temp: "celsius",
        speed: "kmh",
        length: "mm",
    },
};

switchUnitsBtn.addEventListener("click", () => {
    units = SwitchUnits(switchUnitsBtn);
    urlParams.units = units;
    fetchAPI(createSearch(urlParams));
});

unitsValues.forEach((unit: HTMLLinkElement) => {
    unit.addEventListener("click", () => {
        let [type, value] = switchUnit(unit);
        units[`${type}`] = value;
        urlParams.units = units;
        fetchAPI(createSearch(urlParams));
        if (
            units.length === unitValue["me"].length &&
            units.speed === unitValue["me"].speed &&
            units.temp === unitValue["me"].temp
        ) {
            switchUnitsBtn.innerText = "Switch to Imperial";
            switchUnitsBtn.dataset.to = "im";
        } else if (
            units.length === unitValue["im"].length &&
            units.speed === unitValue["im"].speed &&
            units.temp === unitValue["im"].temp
        ) {
            switchUnitsBtn.innerText = "Switch to Metric";
            switchUnitsBtn.dataset.to = "me";
        }
    });
});

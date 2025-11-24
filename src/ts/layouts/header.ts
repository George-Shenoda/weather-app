/* eslint-disable prefer-const */
import { switchUnit, SwitchUnits } from "../utils/switchUnits";
import { Units } from "../interfaces/interfaces";

const switchUnitsBtn = document.querySelector(".switch") as HTMLLinkElement;
const unitsValues = document.querySelectorAll(
    ".values",
) as NodeListOf<HTMLLinkElement>;

let units: Units = {
    temp: "c",
    speed: "km/h",
    length: "mm",
};

const unitValue: {
    im: Units;
    me: Units;
} = {
    im: {
        temp: "f",
        speed: "mph",
        length: "in",
    },
    me: {
        temp: "c",
        speed: "km/h",
        length: "mm",
    },
};

switchUnitsBtn.addEventListener(
    "click",
    () => (units = SwitchUnits(switchUnitsBtn)),
);

unitsValues.forEach((unit: HTMLLinkElement) => {
    unit.addEventListener("click", () => {
        let [type, value] = switchUnit(unit);
        units[`${type}`] = value;
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

console.log(units);

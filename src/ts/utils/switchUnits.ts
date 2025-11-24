import type { Units } from "../interfaces/interfaces";
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

export function SwitchUnits(switchUnitsBtn: HTMLLinkElement): Units {
    const imperial = document.querySelectorAll("[data-unit='im']");
    const metric = document.querySelectorAll("[data-unit='me']");
    if (switchUnitsBtn.dataset.to === "me") {
        switchUnitsBtn.dataset.to = "im";
        switchUnitsBtn.innerText = "Switch to Imperial";
        metric.forEach((unit) => {
            unit.classList.add("active");
        });
        imperial.forEach((unit) => {
            unit.classList.remove("active");
        });
        return unitValue["me"];
    } else if (switchUnitsBtn.dataset.to === "im") {
        switchUnitsBtn.dataset.to = "me";
        switchUnitsBtn.innerText = "Switch to Metric";
        imperial.forEach((unit) => {
            unit.classList.add("active");
        });
        metric.forEach((unit) => {
            unit.classList.remove("active");
        });
        return unitValue["im"];
    }
    return {
        temp: "",
        speed: "",
        length: "",
    };
}

export function switchUnit(unit: HTMLLinkElement): [keyof Units, string] {
    if (!unit.classList.contains("active")) {
        const type = unit.dataset.type;
        const unitTypes = document.querySelectorAll(`[data-type="${type}"]`);
        unitTypes.forEach((unitType) => {
            unitType.classList.toggle("active");
            if (unit.classList.contains("active")) {
                return [
                    unit.dataset.type as keyof Units,
                    unit.dataset.value as string,
                ];
            }
        });
    }
    return [unit.dataset.type as keyof Units, unit.dataset.value as string];
}

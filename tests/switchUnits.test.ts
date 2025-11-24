import { afterEach, describe, expect, it } from "vitest";
import { switchUnit, SwitchUnits } from "../src/ts/utils/switchUnits";

describe("Switch Units", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Should add active to imperial", () => {
    document.body.innerHTML = `
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item switch" data-to="im">Switch to Imperial</a></li>
                <li><h6 class="dropdown-header">Temperature</h6></li>
                <li><a class="dropdown-item active values" data-unit="me">Celsius (°C)</a></li>
                <li><a class="dropdown-item values" data-unit="im">Fahrenheit (°F)</a></li>
            </ul>
        `;
    const switchUnitsBtn = document.querySelector(".switch") as HTMLLinkElement;
    const units = SwitchUnits(switchUnitsBtn);

    expect(switchUnitsBtn.innerText).toBe("Switch to Metric");
    expect(switchUnitsBtn.dataset.to).toBe("me");
    expect(document.querySelector("[data-unit='im']")?.classList).toContain(
      "active",
    );
    expect(document.querySelector("[data-unit='me']")?.classList).not.toContain(
      "active",
    );
    expect(units).toStrictEqual({
      temp: "f",
      speed: "mph",
      length: "in",
    });
  });

  it("Should add active to metric", () => {
    document.body.innerHTML = `
        <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item switch" data-to="me">Switch to Imperial</a></li>
        <li><h6 class="dropdown-header">Temperature</h6></li>
        <li><a class="dropdown-item values" data-unit="me">Celsius (°C)</a></li>
        <li><a class="dropdown-item active values" data-unit="im">Fahrenheit (°F)</a></li>
        </ul>
        `;
    const switchUnitsBtn = document.querySelector(".switch") as HTMLLinkElement;
    const units = SwitchUnits(switchUnitsBtn);

    expect(switchUnitsBtn.dataset.to).toBe("im");
    expect(switchUnitsBtn.innerText).toBe("Switch to Imperial");
    expect(document.querySelector("[data-unit='me']")?.classList).toContain(
      "active",
    );
    expect(document.querySelector("[data-unit='im']")?.classList).not.toContain(
      "active",
    );
    expect(units).toStrictEqual({
      temp: "c",
      speed: "km/h",
      length: "mm",
    });
  });
});

describe("Switch unit", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("Should Return temp, F", () => {
    document.body.innerHTML = `
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item switch" data-to="im">Switch to Imperial</a></li>
                <li><h6 class="dropdown-header">Temperature</h6></li>
                <li><a class="dropdown-item active values" data-type="temp" data-value="c">Celsius (°C)</a></li>
                <li><a class="dropdown-item values" data-type="temp" data-value="f">Fahrenheit (°F)</a></li>
            </ul>
        `;
    const unit = document.querySelector("[data-value='f']") as HTMLLinkElement;
    const [type, value] = switchUnit(unit);
    expect(type).toBe("temp");
    expect(value).toBe("f");
  });
  it("Should Return temp, c", () => {
    document.body.innerHTML = `
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item switch" data-to="im">Switch to Imperial</a></li>
                <li><h6 class="dropdown-header">Temperature</h6></li>
                <li><a class="dropdown-item active values" data-type="temp" data-value="c">Celsius (°C)</a></li>
                <li><a class="dropdown-item values" data-type="temp" data-value="f">Fahrenheit (°F)</a></li>
            </ul>
        `;
    const unit = document.querySelector("[data-value='c']") as HTMLLinkElement;
    const [type, value] = switchUnit(unit);
    expect(type).toBe("temp");
    expect(value).toBe("c");
  });
});

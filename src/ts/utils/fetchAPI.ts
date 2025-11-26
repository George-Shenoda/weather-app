import { updateContext, updateDay } from "./UpdateContext";
import { data } from "./zObject";
import { fromZodError } from "zod-validation-error";
import { city, Location } from "../interfaces/interfaces";
const search = document.querySelector(".search .btn") as HTMLButtonElement;
const input = document.querySelector("#location") as HTMLInputElement;
let location: keyof Location;

export function fetchAPI(url: string) {
    const failedBody = document.querySelector(".failed") as HTMLDivElement;
    const successBody = document.querySelector(".success") as HTMLDivElement;
    const h2 = document.querySelector(".no_result") as HTMLElement;
    const content = document.querySelector(".content") as HTMLDivElement;
    const p = document.querySelector(".labels p") as HTMLParagraphElement;
    fetch(url)
        .then((response) => response.json())
        .then((reading) => {
            const result = data.safeParse(reading);
            if (!result.success) {
                console.log(fromZodError(result.error));
                successBody.style.display = "none";
                failedBody.style.display = "block";
            } else {
                updateContext(result.data[location || city], location || city);
                search.addEventListener("click", () => {
                    if (input.value in result.data) {
                        h2.style.display = "none";
                        content.style.display = "flex";
                        location = input.value.trim() as keyof Location;
                        updateContext(result.data[location], location);
                        input.value = "";
                        p.innerText = result.data[
                            location
                        ].current.time.toLocaleDateString("en-US", {
                            weekday: "long",
                        });
                        updateDay(result.data[location]);
                    } else if (input.value === "") {
                        h2.style.display = "none";
                        content.style.display = "flex";
                    } else {
                        content.style.display = "none";
                        h2.style.display = "block";
                    }
                });
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && input.value) {
                        if (input.value in result.data) {
                            h2.style.display = "none";
                            content.style.display = "flex";
                            location = input.value as keyof Location;
                            updateContext(result.data[location], location);
                            input.value = "";
                            p.innerText = result.data[
                                location
                            ].current.time.toLocaleDateString("en-US", {
                                weekday: "long",
                            });
                            updateDay(result.data[location]);
                        } else {
                            content.style.display = "none";
                            h2.style.display = "block";
                        }
                    }
                });
                failedBody.style.display = "none";
                successBody.style.display = "block";
            }
        })
        .catch(() => {
            successBody.style.display = "none";
            failedBody.style.display = "block";
        });
}

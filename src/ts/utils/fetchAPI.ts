import { data } from "./zObject";
import { fromZodError } from "zod-validation-error";
const search = document.querySelector(".search .btn") as HTMLButtonElement;
const input = document.querySelector("#location") as HTMLInputElement;

export function fetchAPI(url: string) {
    const failedBody = document.querySelector(".failed") as HTMLDivElement;
    const successBody = document.querySelector(".success") as HTMLDivElement;
    const h2 = document.querySelector(".no_result") as HTMLElement;
    fetch(url)
        .then((response) => response.json())
        .then((reading) => {
            const result = data.safeParse(reading);
            if (!result.success) {
                console.log(fromZodError(result.error));
                successBody.style.display = "none";
                failedBody.style.display = "block";
            } else {
                search.addEventListener("click", () => {
                    if (input.value in result.data) {
                        h2.style.display = "none";
                        console.log("yes");
                    } else {
                        h2.style.display = "block";
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

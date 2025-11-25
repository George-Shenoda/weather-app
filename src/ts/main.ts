import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/libs/normalize.css";
import "../css/main.scss";
import "@fortawesome/fontawesome-free/js/all";
import "./layouts/header";
import { fetchAPI } from "./utils/fetchAPI";
import { createSearch } from "./utils/createSearch";
import { urlParams } from "./utils/url";

function cleanData(dirty: string | Node) {
    return DOMPurify.sanitize(dirty);
}
cleanData("<b>P</b>");

let url = createSearch(urlParams);

fetchAPI(url);

document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".retry")) {
        url = createSearch(urlParams);
        fetchAPI(url);
    }
});

const input = document.querySelector("#location") as HTMLInputElement;
const options = document.querySelector(".options") as HTMLUListElement;
const items = document.querySelectorAll("li") as NodeListOf<HTMLLIElement>;

input.addEventListener("focus", () => {
    options.style.display = "block";
});

input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();

    items.forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(filter) ? "block" : "none";
    });

    options.style.display = "block"; // keep visible while typing
});

// Click on option
options.addEventListener("click", (e) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName === "LI") {
        input.value = target.dataset.value as string;
        options.style.display = "none";
    }
});

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    document.querySelectorAll(".bar").forEach((select) => {
        if (!select.contains(target)) {
            const options = select.querySelector(
                ".options",
            ) as HTMLUListElement;
            options.style.display = "none";
        }
    });
});

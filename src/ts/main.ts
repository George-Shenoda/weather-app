import DOMPurify from "dompurify";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
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

const s = z.string();
if (!s.safeParse("3").success) {
    console.log(fromZodError(s.safeParse("3").error as ZodError));
}
cleanData("<b>P</b>");

let url = createSearch(urlParams);
console.log(url);

fetchAPI(url);

document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".retry")) {
        url = createSearch(urlParams);
        fetchAPI(url);
    }
});

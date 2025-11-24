import DOMPurify from "dompurify";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/libs/normalize.css";
import "../css/main.scss";
import "@fortawesome/fontawesome-free/js/all";
import "./layouts/header";

function cleanData(dirty: string | Node) {
    return DOMPurify.sanitize(dirty);
}

const s = z.string();
if (!s.safeParse("3").success) {
    console.log(fromZodError(s.safeParse("3").error as ZodError));
}
cleanData("<b>P</b>");

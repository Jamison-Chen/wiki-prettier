"use strict";
const domSearchInput = document.getElementById("search-input");
const hint = document.getElementById("hint");
window.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && domSearchInput.value && checkInputUrl()) {
        window.open(`./view/?url=${domSearchInput.value}`, "_blank");
        domSearchInput.value = "";
    }
    else
        checkInputUrl();
});
domSearchInput.addEventListener("focus", checkInputUrl);
function checkInputUrl() {
    if (domSearchInput.value.indexOf("wikipedia.org") == -1) {
        hint.style.opacity = "100%";
        return false;
    }
    hint.style.opacity = "0%";
    return true;
}

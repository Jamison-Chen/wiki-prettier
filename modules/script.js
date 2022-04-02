"use strict";
const searchBtn = document.getElementById("search-btn");
const inputUrl = document.getElementById("search-bar");
const hint = document.getElementById("hint");
window.addEventListener("keyup", search);
if (searchBtn != null) {
    searchBtn.addEventListener("click", search);
}
function search(e) {
    if (e instanceof KeyboardEvent && e.key !== "Enter") {
        if (document.activeElement == inputUrl) {
            checkInputUrl();
        }
    }
    else if (checkInputUrl() &&
        inputUrl instanceof HTMLInputElement &&
        inputUrl.value) {
        window.open(`./view/?url=${inputUrl.value}`, "_blank");
        inputUrl.value = "";
    }
}
if (inputUrl != null) {
    inputUrl.addEventListener("focus", checkInputUrl);
}
function checkInputUrl() {
    if (inputUrl instanceof HTMLInputElement && hint != null) {
        if (inputUrl.value.indexOf("wikipedia.org") == -1) {
            hint.style.opacity = "100%";
            return false;
        }
        else {
            hint.style.opacity = "0%";
        }
    }
    return true;
}

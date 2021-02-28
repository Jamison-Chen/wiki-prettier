"use strict";
const testBtn = document.getElementById("test-btn");
const inputUrl = document.getElementById("input-url");
if (testBtn != null && body != null && inputUrl instanceof HTMLInputElement) {
    testBtn.addEventListener("click", function () {
        if (inputUrl.value) {
            window.open(`./view/?url=${inputUrl.value}`, "_blank");
        }
    });
}

"use strict";
// const title: HTMLElement | null = document.getElementById("title");
// const subTitle: HTMLElement | null = document.getElementById("sub-title");
const searchBtn = document.getElementById("search-btn");
const inputUrl = document.getElementById("search-bar");
const hint = document.getElementById("hint");
// applyrwd();
// window.addEventListener("resize", applyrwd);
window.addEventListener("keyup", search);
if (searchBtn != null) {
    searchBtn.addEventListener("click", search);
}
function search(e) {
    if (e instanceof KeyboardEvent && e.keyCode != 13) {
        if (document.activeElement == inputUrl) {
            checkInputUrl();
        }
    }
    else if (checkInputUrl() && inputUrl instanceof HTMLInputElement && inputUrl.value) {
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
// function applyrwd(): void {
//     let windowWidth = window.innerWidth;
//     if (title != null && subTitle != null) {
//         if (1024 <= windowWidth) {
//         } else if (512 <= windowWidth && windowWidth < 1024) {
//         } else if (windowWidth < 512) {
//         }
//     }
// }

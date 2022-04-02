const searchBtn: HTMLElement | null = document.getElementById("search-btn");
const inputUrl: HTMLElement | null = document.getElementById("search-bar");
const hint: HTMLElement | null = document.getElementById("hint");

window.addEventListener("keyup", search);

if (searchBtn != null) {
    searchBtn.addEventListener("click", search);
}

function search(e: Event): void {
    if (e instanceof KeyboardEvent && e.key !== "Enter") {
        if (document.activeElement == inputUrl) {
            checkInputUrl();
        }
    } else if (
        checkInputUrl() &&
        inputUrl instanceof HTMLInputElement &&
        inputUrl.value
    ) {
        window.open(`./view/?url=${inputUrl.value}`, "_blank");
        inputUrl.value = "";
    }
}

if (inputUrl != null) {
    inputUrl.addEventListener("focus", checkInputUrl);
}

function checkInputUrl(): boolean {
    if (inputUrl instanceof HTMLInputElement && hint != null) {
        if (inputUrl.value.indexOf("wikipedia.org") == -1) {
            hint.style.opacity = "100%";
            return false;
        } else {
            hint.style.opacity = "0%";
        }
    }
    return true;
}

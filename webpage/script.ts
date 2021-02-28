const testBtn: HTMLElement | null = document.getElementById("test-btn");
const inputUrl: HTMLElement | null = document.getElementById("input-url");

if (testBtn != null && body != null && inputUrl instanceof HTMLInputElement) {
    testBtn.addEventListener("click", function () {
        if (inputUrl.value) {
            window.open(`./view/?url=${inputUrl.value}`, "_blank");
        }
    });
}
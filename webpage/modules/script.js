"use strict";
const testBtn = document.getElementById("test-btn");
const inputUrl = document.getElementById("input-url");
function test() {
    if (testBtn != null && body != null && inputUrl instanceof HTMLInputElement) {
        testBtn.addEventListener("click", function () {
            if (inputUrl.value) {
                window.open(`./view/?url=${inputUrl.value}`, "_blank");
            }
            // const wikiUrl: string = "https://en.wikipedia.org/wiki/NP-completeness";
            // fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
            //     .then(function (response) {
            //         return response.json();
            //     })
            //     .then(function (myJson) {
            //         body.innerHTML = myJson["body"];
            //     });
        });
    }
}
test();

"use strict";
const testBtn = document.getElementById("test-btn");
const body = document.getElementById("body");
if (testBtn != null) {
    testBtn.addEventListener("click", function () {
        const wikiUrl = "https://en.wikipedia.org/wiki/NP-completeness";
        fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
            .then(function (response) {
            // console.log(response);
            return response.json();
        })
            .then(function (myJson) {
            body === null || body === void 0 ? void 0 : body.innerHTML = myJson["body"];
        });
    });
}

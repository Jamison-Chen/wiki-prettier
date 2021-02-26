"use strict";
const testBtn = document.getElementById("test-btn");
if (testBtn != null) {
    testBtn.addEventListener("click", function () {
        fetch('https://wiki-scraper.herokuapp.com/')
            .then(function (response) {
            // console.log(response.json());
            return response.json();
        })
            .then(function (myJson) {
            console.log(myJson);
        });
    });
}

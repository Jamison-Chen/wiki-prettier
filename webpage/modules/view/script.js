"use strict";
const body = document.getElementById("body");
const webPageTitle = document.getElementById("web-page-title");
let pageTop;
let content;
let firstHeading;
let bodyContent;
let contentText;
let sideBarsAndInfoBoxes;
let windowWidth;
const wikiUrl = window.location.href.split("/webpage/view/?url=")[1];
function main() {
    fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
        .then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
        if (body != null) {
            body.innerHTML = myJson["body"];
            changeDOMStructure();
            applyRWD();
        }
    });
}
function changeDOMStructure() {
    pageTop = document.getElementById("top");
    content = document.getElementById("content");
    firstHeading = document.getElementById("firstHeading");
    bodyContent = document.getElementById("bodyContent");
    contentText = document.getElementById("mw-content-text");
    sideBarsAndInfoBoxes = document.querySelectorAll(".sidebar, .infobox");
    // remove all style tage
    let allStyleTags = document.getElementsByTagName("style");
    while (allStyleTags.length != 0) {
        for (let each of allStyleTags) {
            each.outerHTML = "";
        }
    }
    // remove all original in-line styling
    let allDOMElements = document.getElementsByTagName("*");
    for (let each of allDOMElements) {
        each.removeAttribute("style");
    }
    if (webPageTitle != null && (firstHeading === null || firstHeading === void 0 ? void 0 : firstHeading.innerText) != null) {
        webPageTitle.innerHTML = firstHeading.innerText;
    }
    if (body != null && content != null) {
        body.innerHTML = "";
        body.appendChild(content);
    }
    if (pageTop != null && firstHeading != null) {
        pageTop.innerHTML = "";
        pageTop.appendChild(firstHeading);
    }
    if (bodyContent != null && contentText != null) {
        bodyContent.innerHTML = "";
        bodyContent.appendChild(contentText);
    }
    // change sidebars and infoboxes into info cards
    if (content != null) {
        const e = document.createElement("div");
        e.id = "info-card-bar";
        content.insertBefore(e, content.children[1]);
        for (let each of sideBarsAndInfoBoxes) {
            if (each instanceof HTMLElement) {
                each.style.display = "none";
                const aCard = document.createElement("div");
                aCard.className = "info-card";
                aCard.innerHTML = "info";
                aCard.appendChild(each);
                e.appendChild(aCard);
            }
        }
    }
}
function applyRWD() {
    windowWidth = window.innerWidth;
    if (body != null) {
        body.style.width = `${window.innerWidth - 20}`;
    }
    if (content != null) {
        if (1024 <= windowWidth) {
            content.style.width = "60%";
        }
        else if (512 <= windowWidth && windowWidth < 1024) {
            content.style.width = "80%";
        }
        else if (windowWidth < 512) {
            content.style.width = "90%";
        }
    }
}
main();
window.addEventListener("resize", applyRWD);

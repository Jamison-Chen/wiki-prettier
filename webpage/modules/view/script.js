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
            window.addEventListener("resize", applyRWD);
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
    // remove all original inline styling
    let allDOMElements = document.getElementsByTagName("*");
    for (let each of allDOMElements) {
        each.removeAttribute("style");
    }
    // modify all anchors href
    const allAnchors = document.getElementsByTagName("a");
    for (let each of allAnchors) {
        if (each.href.split("?url=")[0] != window.location.href.split("?url=")[0]) {
            if (each.href.indexOf("/wiki/") != -1) {
                each.href = `${window.location.href.split("/wiki/")[0]}/wiki/${each.href.split("/wiki/")[1]}`;
            }
        }
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
        const infoCardBar = document.createElement("div");
        infoCardBar.id = "info-card-bar";
        content.insertBefore(infoCardBar, content.children[1]);
        for (let each of sideBarsAndInfoBoxes) {
            if (each instanceof HTMLElement) {
                each.style.display = "none";
                const aCard = document.createElement("div");
                aCard.className = "info-card fold";
                const containerShowed = document.createElement("div");
                containerShowed.className = "container-showed fold";
                containerShowed.appendChild(each);
                aCard.innerHTML = "info";
                aCard.appendChild(containerShowed);
                infoCardBar.appendChild(aCard);
                aCard.addEventListener("click", expandInfoCard);
            }
        }
    }
}
function expandInfoCard(e) {
    if (e.target instanceof HTMLElement) {
        e.target.removeEventListener("click", expandInfoCard);
        e.target.addEventListener("click", foldInfoCard);
        e.target.className = "info-card expand";
        const containerShowed = e.target.querySelector(".container-showed");
        const infoTable = containerShowed === null || containerShowed === void 0 ? void 0 : containerShowed.querySelector(".sidebar, .infobox");
        if (containerShowed != null && infoTable instanceof HTMLElement) {
            containerShowed.className = "container-showed expand";
            infoTable.style.display = "table";
            e.target.innerHTML = "";
            e.target.appendChild(containerShowed);
        }
    }
}
function foldInfoCard(e) {
    if (e.target instanceof HTMLElement && e.target.className.indexOf("info-card") != -1) {
        e.target.removeEventListener("click", foldInfoCard);
        e.target.addEventListener("click", expandInfoCard);
        e.target.className = "info-card fold";
        const containerShowed = e.target.querySelector(".container-showed");
        const info = containerShowed === null || containerShowed === void 0 ? void 0 : containerShowed.querySelector(".sidebar, .infobox");
        if (containerShowed != null && info instanceof HTMLElement) {
            containerShowed.className = "container-showed fold";
            info.style.display = "none";
            e.target.innerHTML = "info";
            e.target.appendChild(containerShowed);
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
            content.className = "wide";
        }
        else if (512 <= windowWidth && windowWidth < 1024) {
            content.className = "narrow";
        }
        else if (windowWidth < 512) {
            content.className = "super-narrow";
        }
    }
}
main();

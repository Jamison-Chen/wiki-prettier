"use strict";
const body = document.getElementById("body");
const fetchedContentContainer = document.getElementById("fetched-content-container");
const webPageTitle = document.getElementById("web-page-title");
let pageTop;
let content;
let firstHeading;
let bodyContent;
let contentText;
let sideBarsAndInfoBoxes;
let contentsList;
let contentsListToggle;
let allHeadlines;
let lastCorrenpondingAnchor;
let allComponents;
let allMathExpressionss;
const backendUrl = window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
    ? "http://127.0.0.1:5000/fetchContent?url="
    : "https://my-crawler.onrender.com/fetchContent?url=";
const wikiUrl = window.location.href.split("/view/?url=")[1];
function main() {
    if (body != null) {
        body.className = "waiting";
    }
    fetch(`${backendUrl}${wikiUrl}`)
        .then((resp) => resp.json())
        .then(function (myJson) {
        if (body != null && fetchedContentContainer != null) {
            body.className = "normal";
            fetchedContentContainer.innerHTML = myJson["body"];
            modifyDOMStructure();
            window.addEventListener("scroll", makeCorrespoingAnchorBold);
            window.addEventListener("click", clickContentsListToggle);
        }
    });
}
function modifyDOMStructure() {
    pageTop = document.getElementById("top");
    content = document.getElementById("content");
    firstHeading = document.getElementById("firstHeading");
    bodyContent = document.getElementById("bodyContent");
    contentText = document.getElementById("mw-content-text");
    sideBarsAndInfoBoxes = document.querySelectorAll(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
    contentsList = document.getElementById("toc");
    allHeadlines = document.getElementsByClassName("mw-headline");
    const allWeiredNavbars = document.getElementsByClassName("navbar");
    while (allWeiredNavbars.length != 0) {
        for (let each of allWeiredNavbars) {
            each.parentElement?.removeChild(each);
        }
    }
    const printfooter = document.getElementsByClassName("printfooter");
    while (printfooter.length != 0) {
        for (let each of printfooter) {
            each.parentElement?.removeChild(each);
        }
    }
    let catlinks = document.getElementById("catlinks");
    catlinks?.parentElement?.removeChild(catlinks);
    let externalLink = document.querySelector("#External_links, #外部連結");
    let externalLinkID = externalLink?.id;
    if (externalLink instanceof HTMLElement &&
        externalLink.parentElement != null) {
        while (externalLink != null && externalLink.tagName != "H2") {
            externalLink = externalLink.parentElement;
        }
    }
    while (externalLink != null) {
        let next = externalLink.nextElementSibling;
        externalLink.parentElement?.removeChild(externalLink);
        externalLink = next;
    }
    let externalLinkAnchor = document.querySelector(`#toc a[href='#${externalLinkID}']`);
    if (externalLinkAnchor instanceof HTMLElement &&
        externalLinkAnchor.parentElement != null) {
        while (externalLinkAnchor != null &&
            externalLinkAnchor.tagName != "LI") {
            externalLinkAnchor = externalLinkAnchor.parentElement;
        }
    }
    while (externalLinkAnchor != null) {
        let next = externalLinkAnchor.nextElementSibling;
        externalLinkAnchor.parentElement?.removeChild(externalLinkAnchor);
        externalLinkAnchor = next;
    }
    let allStyleTags = document.getElementsByTagName("style");
    while (allStyleTags.length != 0) {
        for (let each of allStyleTags) {
            each.outerHTML = "";
        }
    }
    let allDOMElements = document.getElementsByTagName("*");
    for (let each of allDOMElements) {
        each.removeAttribute("style");
    }
    const allAnchors = document.getElementsByTagName("a");
    for (let each of allAnchors) {
        if (each.href.split("?url=")[0] !=
            window.location.href.split("?url=")[0]) {
            if (each.href.indexOf("/wiki/") != -1) {
                each.href = `${window.location.href.split("/wiki/")[0]}/wiki/${each.href.split("/wiki/")[1]}`;
            }
        }
    }
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
    if (content != null &&
        contentsList != null &&
        contentsList.parentElement != null) {
        let oldToggle = document.getElementById("toctogglecheckbox");
        if (oldToggle != null) {
            contentsList.removeChild(oldToggle);
        }
        contentsListToggle = document.createElement("div");
        contentsListToggle.id = "contents-list-toggle";
        contentsListToggle.className = "to-expand";
        contentsListToggle.addEventListener("click", expandContentsList);
        const outerDiv = document.createElement("div");
        outerDiv.innerHTML = contentsList.innerHTML;
        outerDiv.appendChild(contentsListToggle);
        contentsList.innerHTML = "";
        contentsList.appendChild(outerDiv);
        contentsList.classList.add("fold");
        contentsList.parentElement.removeChild(contentsList);
        content.insertBefore(contentsList, content.children[2]);
    }
    let allEditSections = document.getElementsByClassName("mw-editsection");
    while (allEditSections.length != 0) {
        for (let each of allEditSections) {
            each.parentElement?.removeChild(each);
        }
    }
    allMathExpressionss = document.querySelectorAll(".mwe-math-element>img");
    for (let each of allMathExpressionss) {
        if (each.parentElement != null) {
            const tempParent = each.parentElement;
            tempParent.innerHTML = "";
            tempParent.appendChild(each);
        }
    }
    if (webPageTitle != null && firstHeading?.innerText != null) {
        webPageTitle.innerHTML = firstHeading.innerText;
    }
    if (fetchedContentContainer != null && content != null) {
        fetchedContentContainer.innerHTML = "";
        fetchedContentContainer.appendChild(content);
    }
    if (pageTop != null && firstHeading != null) {
        pageTop.innerHTML = "";
        pageTop.appendChild(firstHeading);
    }
    if (bodyContent != null && contentText != null) {
        bodyContent.innerHTML = "";
        bodyContent.appendChild(contentText);
    }
}
function expandInfoCard(e) {
    if (e.target instanceof HTMLElement) {
        e.target.removeEventListener("click", expandInfoCard);
        e.target.addEventListener("click", foldInfoCard);
        e.target.className = "info-card expand";
        const containerShowed = e.target.querySelector(".container-showed");
        const infoTable = e.target.querySelector(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
        if (containerShowed != null && infoTable instanceof HTMLElement) {
            containerShowed.className = "container-showed expand";
            infoTable.style.display = "table";
            e.target.innerHTML = "";
            e.target.appendChild(containerShowed);
        }
    }
}
function foldInfoCard(e) {
    if (e.target instanceof HTMLElement &&
        e.target.classList.contains("info-card")) {
        e.target.removeEventListener("click", foldInfoCard);
        e.target.addEventListener("click", expandInfoCard);
        e.target.className = "info-card fold";
        const containerShowed = e.target.querySelector(".container-showed");
        const info = e.target.querySelector(".navbox, .sidebar, .infobox, .box-More_footnotes, .box-Multiple_issues");
        if (containerShowed != null && info instanceof HTMLElement) {
            containerShowed.className = "container-showed fold";
            info.style.display = "none";
            e.target.innerHTML = "info";
            e.target.appendChild(containerShowed);
        }
    }
}
function expandContentsList(e) {
    if (e.target instanceof HTMLElement && contentsList != null) {
        e.target.className = "to-fold";
        e.target.removeEventListener("click", expandContentsList);
        e.target.addEventListener("click", foldContentsLst);
        contentsList.classList.add("expand");
    }
}
function foldContentsLst(e) {
    if (e.target instanceof HTMLElement && contentsList != null) {
        e.target.className = "to-expand";
        e.target.removeEventListener("click", foldContentsLst);
        e.target.addEventListener("click", expandContentsList);
        contentsList.classList.remove("expand");
    }
}
function makeCorrespoingAnchorBold(e) {
    if (allHeadlines != null) {
        let minDistanceToPageTop = Infinity;
        let closestHeadline = null;
        for (let each of allHeadlines) {
            let distanceToPageTop = Math.abs(each.getBoundingClientRect().top);
            if (distanceToPageTop < minDistanceToPageTop) {
                minDistanceToPageTop = distanceToPageTop;
                closestHeadline = each;
            }
        }
        let correnpondingAnchor = document.querySelector(`#toc a[href='#${closestHeadline?.id}']`);
        if (lastCorrenpondingAnchor != null) {
            lastCorrenpondingAnchor.classList.remove("on");
        }
        if (correnpondingAnchor instanceof HTMLElement) {
            correnpondingAnchor.classList.add("on");
            lastCorrenpondingAnchor = correnpondingAnchor;
        }
    }
}
function clickContentsListToggle(e) {
    if (e.target instanceof HTMLElement) {
        if (e.target.className == "toctext" && contentsListToggle != null) {
            contentsListToggle.click();
        }
    }
}
main();

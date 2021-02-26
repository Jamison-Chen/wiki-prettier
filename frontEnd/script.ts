const testBtn: HTMLElement | null = document.getElementById("test-btn");
const body: HTMLElement | null = document.getElementById("body");
if (testBtn != null) {
    testBtn.addEventListener("click", function () {
        const wikiUrl: string = "https://en.wikipedia.org/wiki/NP-completeness";
        fetch(`https://wiki-scraper.herokuapp.com/fetchContent?url=${wikiUrl}`)
            .then(function (response) {
                // console.log(response);
                return response.json();
            })
            .then(function (myJson) {
                body?.innerHTML = myJson["body"];
            });
    });
}

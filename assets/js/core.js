function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function escapeHTML(html) {
    return $("<div>").text(html).html();
}

function rndArrE(arr) {
    return arr[rndi(0, arr.length - 1)];
}

function rnd(min, max) {
    return min + Math.random() * (max - min);
}

function rndi(min, max) {
    return Math.floor(rnd(min, max + 1));
}

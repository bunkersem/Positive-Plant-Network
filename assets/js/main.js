window.addEventListener('load', function () {
    // thrid party cookie check
    var receiveMessage = function (evt) {
        if (evt.data === 'MM:3PCunsupported') {
            console.warn('third party cookies are disabled');
        }
    };
    window.addEventListener("message", receiveMessage, false);
});



// breadcrumb

var $breadcrumb = $('.breadcrumb');
if ($breadcrumb.length > 0)
    createBreadCrumb();

function createBreadCrumb() {
    var locs = window.location.pathname.split('/')
        .filter(function (pathSegment) { return pathSegment !== ''; })
        .map(function (pathname) { return encodeURIComponent(pathname); }) // xss 
        // because these pathanmes are already in uri format the pathname should not change
        .map(function(pathname) { return pathname.charAt(0).toUpperCase() + pathname.slice(1); });

    // create home
    createBreadCrumbElement('Home', '');

    var link;
    var name;
    for (var i = 0; i < locs.length; i++) {
        name = locs[i].split('.')[0]; // remove extensions
        name[0] = name.charAt(0).toUpperCase();
        link = locs.slice(0, i + 1).join('/');

        createBreadCrumbElement(name, link);
    }
    
}
function createBreadCrumbElement(name, link) {
    $breadcrumb.append($('\
        <div class="breadcrumb-item">\
        <a href="/'+ link + '">' + name + '</a>\
        </div>\
    '));
}
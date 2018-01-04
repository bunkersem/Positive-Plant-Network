(function () {

    $('#user-search').on('click', function () {
        var search = $('#user-search-value').val().trim();
        if (/^[A-Za-z0-9_-]+$/.test(search)) {
            $('#user-search-value-warning').removeClass('hidden');
        } else {

        }
        

        var ref = firebase.database().ref('/users/public/');
        var $results = $('#user-search-results');

        // clear previous search results
        $results.empty();

        ref.orderByChild('username').once('value')
            .then(function handleNewUserSearchData(snapshot) {
                const result = snapshot.val();
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        var child = result[key];
                        addUserSearchEntry(key, child);
                    }
                }
            });
        function addUserSearchEntry(uid, user) {
            $results.append($(
                '<a class="search-result-user" href="/community/user.html?uid=' + uid + '">\
                <div class="search-result-user-icon-container">\
                    <div class="search-result-user-icon" style="background-image: url(' + user.profile_picture + ')"></div>\
                </div>\
                <div class="username-container">\
                    <h3 class="username">\
                        <span class="username-value">' + user.username + '</span>\
                    </h3>\
                </div>\
                </a>'
            ));
        }
    });
})();










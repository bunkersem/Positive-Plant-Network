(function () {
    var data = null;

    var ref = firebase.database().ref('/public/quizzes/index/');
    var $results = $('#quizzes-search-results');
    var $searchBtn = $('#quizzes-search');
    var $searchInput = $('#searchString');

    // clear previous search results
    $results.empty();
    $searchBtn.on('click', function (e) {
        loadSearchResults(function(data) {
            renderSearchResults(data, $searchInput.val());
        });
    });

    function loadSearchResults(cb) {
        if (data)
            cb(data);
        else {
            ref.orderByChild('name').once('value')
                .then(function handleNewUserSearchData(snapshot) {
                    const result = snapshot.val();
                    data = result;
                    cb(data);
                });
        }
    }

    function renderSearchResults(data, searchStr) {
        var regex = new RegExp(escapeRegExp(searchStr), 'i');
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                const quiz = data[key];
                if (regex.test(quiz.name)) {
                    addSearchResultEntry(key, quiz);
                }
            }
        }
    }

    function addSearchResultEntry(key, quiz) {
        $results.append(
            '<div>\
            <h3><a href="/quizzes/quiz.html?quiz-id=' + key + '">' + quiz.name + '</a></h3>\
            <p>' + quiz.info + '</p>\
            \
            </div>'
        )
    }

})();

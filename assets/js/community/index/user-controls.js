// make user controls visible if the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#user-controls').removeClass('hidden');
        $('#user-control-goto-profile').on('click', handleUserControlGotoProfileClick);
        $('#user-control-logout').on('click', handleUserControlLogout);
    }

    function handleUserControlGotoProfileClick(e) {
        window.location.href = '/community/user.html?uid=' + user.uid;
    }

    function handleUserControlLogout(e) {
        firebase.auth().signOut().then(function () {
            window.location.href='/community/';
        }).catch(function (error) {
            alert('Unable to logout. ' + error.message);
        });
    }
});
(function () {
    var viewingUserUid = getQueryParam('uid');

    firebase.auth().onAuthStateChanged(function (user) {
        // if (user) {
        //     console.log('loggedin')
        //     // User is signed in.
        //     var displayName = user.displayName;
        //     var email = user.email;
        //     var emailVerified = user.emailVerified;
        //     var photoURL = user.photoURL;
        //     var isAnonymous = user.isAnonymous;
        //     var uid = user.uid;
        //     var providerData = user.providerData;
        // } else {
        //     console.log('not loggedin')
        // }
    });

    // make content editable if user is logged in and this is the users own account.
    firebase.auth().onAuthStateChanged(function (user) {
        console.log('user', user);
        if (user && user.uid === viewingUserUid) {
            $('#personal input, #personal textarea').removeAttr('readonly');
            $('#personal input, #personal textarea').removeClass('nostyle');
            $('#profile-pic-edit, #profile-save').removeClass('hidden');
        }
    });


    var userRef = firebase.database().ref('/users/public/' + viewingUserUid);
    userRef.on('value', function (snapshot) {
        console.log('got public user data', snapshot.val());
        if (!snapshot || !snapshot.val()) return;
        var userPublicData = snapshot.val();
        // set profile picture
        $('#profile-pic').css('background-image', 'url(' + userPublicData.profile_picture + ')');
        // set username
        $('#profile-name').val(userPublicData.username);
        // set description
        $('#profile-description').val(userPublicData.descriptioin);
    });

})();
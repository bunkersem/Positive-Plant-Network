// auth init

firebase.auth().useDeviceLanguage();


// current user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('loggedin')
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
    } else {
        // user is not signed in
        console.log('not loggedin')
    }
});

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@provider.com',
});
function g_signup() {
    firebase.auth().signInWithRedirect(provider);
}

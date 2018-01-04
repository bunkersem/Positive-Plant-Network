
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log('loggedin')
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;
//     } else {
//         console.log('not loggedin')
//     }
// });


// make visitor controls visible if the user is not logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        $('#visitor-controls').removeClass('hidden');
    }

});
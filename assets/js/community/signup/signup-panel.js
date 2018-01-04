

// tab panel
$('#section-signup .panel .tabbutton').on('click', function (e) {
    $('#section-signup .panel .tab-target').addClass('hidden');
    var tabTarget = $(e.target).attr('data-target');
    $(tabTarget).removeClass('hidden');
});


try {
    // sign up with google
    $('#sign-up-with-google').on('click', g_signup);
    $('#sign-up-with-email').on('click', createAccountWithEmail);
    $('#login-with-email').on('click', signinWithEmail);

    function createAccountWithEmail(e) {
        $('#user-load').removeClass('hidden');
        setTimeout(function () {
            $('#user-load').addClass('hidden');
        }, 3000);
        var email = $('#email-signup-email').val();
        var password = $('#email-signup-password').val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                createNewUser(user);
            })
            .catch(function (error) {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // TODO
                alert('Unable to create user. ' + error.message);
                $('#user-load').addClass('hidden');
            });
    }

    function signinWithEmail(e) {
        $('#user-load').removeClass('hidden');
        setTimeout(function () {
            $('#user-load').addClass('hidden');
        }, 3000);
        var email = $('#email-login-email').val();
        var password = $('#email-login-password').val();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                window.location.href = '/community/user.html?uid=' + user.uid;
            })
            .catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ...
                // TODO show visual message
                alert('Unable to sign in user. ' + error.message);
                $('#user-load').addClass('hidden');
            });
    }  

    // handle result
    firebase.auth().getRedirectResult().then(function (result) {
        // if (result.credential) {
        //     var token = result.credential.accessToken;
        // }
        var user = result.user;
        if (!user) return; // no redirect
        handleRedirectResult(user);
    }).catch(function (error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        // TODO
        console.error(error);
        alert('Unable to login user. ' + error.message);
        $('#user-load').addClass('hidden');
    });

    function handleRedirectResult(user) {

        $('#user-load').removeClass('hidden');
        setTimeout(function () {
            $('#user-load').addClass('hidden');
        }, 3000);

        checkIfUserExists(user).done(function (exists) {
            console.log('exists', exists);
            if (exists) {
                window.location.href = '/community/user.html?uid=' + user.uid;
            }
            else {
                createNewUser(user);
            }
        }).fail(function (error) {
            // fail
            // TODO
            alert('Something wen\'t wrong. Could not check if user existed. ' + error.message);
            $('#user-load').addClass('hidden');
        });
    }

    function checkIfUserExists(user) {
        console.log('checkIfUserExists')
        var dfd = $.Deferred();
        firebase.database().ref('users/public/' + user.uid).once('value').then(function (snapshot) {
            dfd.resolve(!!(snapshot && snapshot.val()));
        }).catch(function (error) {
            dfd.reject(error);
        });
        return dfd.promise();
    }

    function createNewUser(user) {
        var profilePic = chance.avatar();
        var rndUsernamePromise = getRandUsername();

        rndUsernamePromise.done(function (username) {
            console.log('rnd usernamepromise done');
            const publicData = {
                username: username,
                profile_picture: profilePic
            };
            return $.when(
                storePublicUserDataInFirebase(user, publicData),
                storePrivateUserDataInFirebase())
        })
            .done(function () {
                console.log('firebase promises done');
                alert('done');
                window.location.href = '/community/user.html?uid=' + user.uid;
            }).fail(function (error) {
                // fail
                // TODO
                alert('Something wen\'t wrong. Could store user data. ' + error.message);
                $('#user-load').addClass('hidden');
            });
    }

    function storePublicUserDataInFirebase(user, publicData) {
        var dfd = $.Deferred();
        console.log('storePublicUserDataInFirebase');
        firebase.database().ref('users/public/' + user.uid).set(publicData, function (error) {
            if (error) {
                //Unable to set username and profile picture
                // TODO
                alert('Unable to set username and profile picture');
            }
            dfd.resolve();
        });
        return dfd.promise();
    }

    // TODO implemnt
    // dummy function
    function storePrivateUserDataInFirebase() {
        var dfd = $.Deferred();
        console.log('storePrivateUserDataInFirebase');
        setTimeout(() => {
            dfd.resolve();
        }, 1);
        return dfd.promise();
    }

    function getRandUsername() {
        var dfd = $.Deferred();
        console.log('getRandUsername');
        $.ajax({
            url: 'https://randomuser.me/api/?inc=login,username',
            dataType: 'json',
            success: function (data) {
                var username = data.results[0].login.username;
                dfd.resolve(username);
            },
            error: function (error) {
                console.error(error);
                var username = Math.round(Math.random() * Number.MAX_VALUE).toString(36);
                dfd.resolve(username);
            }
        });
        return dfd.promise();
    }
} catch (error) {
    alert('Something wen\'t wrong while signing up. ' + error.message);
    $('#user-load').addClass('hidden');
}
window.addEventListener('load', function () {
    // thrid party cookie check
    var receiveMessage = function (evt) {
        if (evt.data === 'MM:3PCunsupported') {
            // show third party cookie warnings
            $('.third-party-cookies-disabled').removeClass('hidden');
            $('#g-signup, #t-signup, #f-signup').find('button.signin-btn')
                .addClass('disabled').attr('disabled', true);
        }
    };
    window.addEventListener('message', receiveMessage, false);
});

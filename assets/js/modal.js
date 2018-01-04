window.addEventListener('load', function () {
    (function () {
        // Get the modal
        const imgmodal = document.getElementById('imgmodal');

        if (imgmodal === null)
            return;

        // Get the image and insert it inside the modal - use its 'alt' text as a caption
        const modalImg = document.getElementById('imgmodal-image')
        const captionText = document.getElementById('imgmodal-caption');

        document.addEventListener('click', (e) => {
            var classes = (e.target).getAttribute('class') || '';
            if (classes.indexOf('trigger-imgmodal') !== -1) {
                let width = '80%';
                // if image is really tall, make it smaller:
                try {
                    const screenRatio = window.innerHeight / window.innerWidth;
                    const imgRatio = (e.target).clientHeight / (e.target).clientWidth;
                    if (imgRatio > screenRatio)
                        width = 80 / imgRatio * screenRatio + '%';
                } catch (err) { console.error(err); }
                imgmodal.style.display = 'block';
                imgmodal.setAttribute('aria-expanded', 'true');
                modalImg.src = (e.target).src;
                modalImg.style.maxWidth = width;
                captionText.innerText = (e.target).alt;
            }
        });
        // Get the <span> element that closes the modal
        const span = imgmodal.getElementsByClassName('close')[0];

        // When the user clicks on <span> (x), close the modal
        span.addEventListener('click', function (e) {
            imgmodal.style.display = 'none';
            imgmodal.setAttribute('aria-expanded', 'false');
        });
    })();

    function checkCookie() {
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = document.cookie.indexOf("testcookie") != -1;
        }
        return !!cookieEnabled
    }
    if (!checkCookie()) {
        $('#nocookie-modal').css('display', 'block');
    }

    // thrid party cookie check
    var receiveMessage = function (evt) {
        if (evt.data === 'MM:3PCunsupported') {
            // $('#no-thrid-party-cookie-modal').css('display', 'block');
        }
    };
    window.addEventListener("message", receiveMessage, false);

});
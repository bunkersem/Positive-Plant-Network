/* <div id="quiz">
    <section id="section-quiz-header">
        <h3><span id="quiz-header-title"></span></h3>
        <p><span id="quiz-header-info"></span></p>
    </section>
    <section id="section-quiz-main">
        <ol id="quiz-questions"></ol>
    </section>
    <section id="section-quiz-footer">

    </section>
</div> */

var positiveResultPhrases = ['Great job', 'Good job'];
var negativeResultPhrases = ['Wrong answer', 'Incorrect...'];

var quizId = getQueryParam('quiz-id');

firebase.database().ref('public/quizzes/index/' + quizId).once('value').then(function (snapshot) {
    if (snapshot.val())
        createQuiz(snapshot.val());
    else {
        // TODO
        alert('Unable to load quiz.');
    }
});

function createQuiz(quiz) {
    console.log('quiz', quiz);
    $('#quiz-header-title').text(quiz.title);
    $('#quiz-header-info').text(quiz.info);
    $('#quiz #quiz-loader').addClass('hidden');
    for (var i = 0; i < quiz.questions.length; i++) {
        createQuizQuestion(quiz.questions[i], i);
    }
}

function createQuizQuestion(question, questionIndex) {
    var $quizQuestions = $('#quiz-questions');
    var $newQuizQuestionItem = $('\
    <li class="quiz-question-item">\
    <div class="quiz-question-item-content">\
    <h2 class="quiz-question-item-title text-primary">' + escapeHTML(question.title) + '</h2>\
    <ol class="quiz-question-item-options">\
    </ol>\
    <button type="button" class="quiz-question-item-submit-answer btn primary">Answer</button>\
    <p class="quiz-question-item-result hidden"></p>\
    <p class="quiz-question-item-info text-info hidden">' + escapeHTML(question.info) + '</p>\
    </div>\
    <hr>\
    </li>');

    var $newQuizQuestionItemOptions = $newQuizQuestionItem.find('.quiz-question-item-options');

    for (var i = 0; i < question.options.length; i++) {
        $newQuizQuestionItemOptions.append(
            $('<li class="quiz-question-item-options-item" data-id="' + i + '">\
            <input id="' + questionIndex + i + '" type="radio" name="' + questionIndex + '" value="' + i + '">\
            <label id="' + questionIndex + i + '">' + escapeHTML(question.options[i]) + '</label>\
            </li>'));
    }

    $newQuizQuestionItem.find('.quiz-question-item-submit-answer').on('click', function(e) {
        var msg;

        var $btn = $newQuizQuestionItem.find('.quiz-question-item-submit-answer');
        var $radioInputs = $newQuizQuestionItemOptions.find('input');
        var $questionResult = $newQuizQuestionItem.find('.quiz-question-item-result');
        var $questionInfo = $newQuizQuestionItem.find('.quiz-question-item-info');

        var result = parseInt($radioInputs.serializeArray()[0].value);
        var correct = result === question.answer;

        // disable question interactivity
        $btn.addClass('disabled').attr('disabled', true);
        $radioInputs.addClass('disabled').attr('disabled', true);

        console.log('correct?', correct);
        if (correct) {
            msg = rndArrE(positiveResultPhrases);
            $questionResult.text(msg)
                .removeClass('text-danger')
                .css('font-weight','Bold')
                .addClass('text-primary')
                .removeClass('hidden');
        }
        else {
            msg = rndArrE(negativeResultPhrases) + ' the correct answer was ' + question.options[question.answer];
            $questionResult.text(msg)
                .removeClass('text-primary')
                .addClass('text-danger')
                .removeClass('hidden');
        }

        // show question info
        $questionInfo.removeClass('hidden');
    });

    $quizQuestions.append($newQuizQuestionItem);
}

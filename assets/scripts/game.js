let currentQuestion = 0;
let yourScore = 0;
let highScores = [];

// question and answer text bodies
$promptOutput = $('#question-prompt');
$aOutput = $('#qa');
$bOutput = $('#qb');
$cOutput = $('#qc');
$dOutput = $('#qd');

// questions and answers
const question1 = {
    prompt: 'This is question 1.',
    A: 'A text', 
    B: 'B text',
    C: 'C text',
    D: 'D text',
    correct: 'A text'
}

const question2 = {
    prompt: 'This is question 2.',
    A: 'A text',
    B: 'B text',
    C: 'C text',
    D: 'D text',
    correct: 'B text'
}

const question3 = {
    prompt: 'This is question 3.',
    A: 'A text',
    B: 'B text',
    C: 'C text',
    D: 'D text',
    correct: 'C text'
}

const question4 = {
    prompt: 'This is question 4.',
    A: 'A text',
    B: 'B text',
    C: 'C text',
    D: 'D text',
    correct: 'D text'
}

const question5 = {
    prompt: 'This is question 5.',
    A: 'A text',
    B: 'B text',
    C: 'C text',
    D: 'D text',
    correct: 'A text'
}

// used to determine which question/answers to fill in the html
let question = question1;

function checkQuestion() {
    if (currentQuestion === 2) {
        question = question2;
        return;
    }
    if (currentQuestion === 3) {
        question = question3;
        return;
    }
    if (currentQuestion === 4) {
        question = question4;
        return;
    }
    if (currentQuestion === 5) {
        question = question5;
        return;
    }
}

// prompts question with an interval
function questionInterval(string) {
    const text = string.split(' ');
    $promptOutput.empty();
    var interval = setInterval(function () {
        let word = text.shift();
        if (!word) {
            return clearInterval(interval)
        }
        $promptOutput.append(word + ' ');
    }, 400)
}

// handles starting the game
$('.start').on('click', function () {
    console.log(document.cookie);
    currentQuestion = 0;
    yourScore = 0;
    currentQuestion++;
    $(this).addClass('hide');
    $('.questions').removeClass('hide');

    questionInterval(question.prompt);

    function aText() {
        $aOutput.html(question.A);
    }
    setTimeout(aText, 2500);

    function bText() {
        $bOutput.html(question.B);
    }
    setTimeout(bText, 4500);

    function cText() {
        $cOutput.html(question.C);
    }
    setTimeout(cText, 6500);

    function dText() {
        $dOutput.html(question.D);
    }
    setTimeout(dText, 8500);

});

// prompts the next question
$('.next').on('click', function() {
    $('.next-question').addClass('hide');
    $('.questions').removeClass('hide');

    $promptOutput.empty();
    $aOutput.empty();
    $bOutput.empty();
    $cOutput.empty();
    $dOutput.empty();

    currentQuestion++;
    console.log(currentQuestion);
    checkQuestion();
    
    questionInterval(question.prompt);

    function aText() {
        $aOutput.html(question.A);
    }
    setTimeout(aText, 2500);

    function bText() {
        $bOutput.html(question.B);
    }
    setTimeout(bText, 4500);

    function cText() {
        $cOutput.html(question.C);
    }
    setTimeout(cText, 6500);

    function dText() {
        $dOutput.html(question.D);
    }
    setTimeout(dText, 8500);

});

// answer selection
$('#answerA').on('click', function() {
    const answer = $(this).find('#qa').html();
    if (answer === '') { // handles attempts to select an answer while the text is timed out
        return;
    }
    if (answer === question.correct) {
        yourScore++;
        console.log('correct');
        correctAnswer();
        return;
    }
    incorrectAnswer();

})

$('#answerB').on('click', function() {
    const answer = $(this).find('#qb').html();
    if (answer === '') {
        return;
    }
    if (answer === question.correct) {
        yourScore++;
        console.log('correct');
        correctAnswer();
        return;
    }
    incorrectAnswer();
})

$('#answerC').on('click', function() {
    const answer = $(this).find('#qc').html();
    if (answer === '') {
        return;
    }
    if (answer === question.correct) {
        yourScore++;
        console.log('correct');
        correctAnswer();
        return;
    }
    incorrectAnswer();

})

$('#answerD').on('click', function() {
    const answer = $(this).find('#qd').html();
    if (answer === '') {
        return;
    }
    if (answer === question.correct) {
        yourScore++;
        console.log('correct');
        correctAnswer();
        return;
    }
    incorrectAnswer();
})

// handles the selection of a correct answer
function correctAnswer() {
    $('.questions').addClass('hide');

    if (currentQuestion < 5) {
        // clears timeouts in cases where a user selects an answer before all timeouts are complete
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearInterval(i);
            }
        }, 0);
        $('.next-question').removeClass('hide');
        return;
    }

    $('.victor').removeClass('hide');
    $('#victor-score').html('Your Score: ' + yourScore );
    highScores.push(yourScore);
    setHighScore(highScores);
}

// handles the selection of an incorrect answer
function incorrectAnswer() {
    $('.questions').addClass('hide');
    $('.game-over').removeClass('hide');
    $('#your-score').html('Your Score: ' + yourScore);
    highScores.push(yourScore);
    setHighScore(highScores);
    $('.game-over').on('click', function() {
        $('.game-over').addClass('hide');
        location.reload();
    });
}

// high scores
function setHighScore(highScores) {
    if (!highScores) {
        return;
    }
    localStorage.setItem('highscores', JSON.stringify(highScores));
}

function loadHighScores() {
    let leaderboard = localStorage.getItem('highscores');
    if (!leaderboard) {
        return false;
    }
    leaderboard = JSON.parse(leaderboard);
    highScores = leaderboard;
    highScores.sort();
    highScores.reverse();

    for (let i=0; i < 5; i++) {
        let highScoreSpan = document.createElement('span');
        highScoreSpan.className = 'high-scores';
        highScoreSpan.id = 'highscore-' + highScores[i];

        if (highScores[i] === undefined) {
            highScoreSpan.innerHTML = '';
        } else {
            highScoreSpan.innerHTML = i + 1 + '. ' + highScores[i];
        }
        
        $('.leaderboard').append(highScoreSpan);
        console.log(highScoreSpan.innerHTML);
    }
}

loadHighScores();

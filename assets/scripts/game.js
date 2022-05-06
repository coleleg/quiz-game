let currentQuestion = 0;
let yourScore = 0;
let yourName;
let highScores = [];


// question and answer text bodies
$promptOutput = $('#question-prompt');
$aOutput = $('#qa');
$bOutput = $('#qb');
$cOutput = $('#qc');
$dOutput = $('#qd');

// questions and answers
const question1 = {
    prompt: `What is the name of Arya Stark's dire wolf?`,
    A: 'Lady', 
    B: 'Nymeria',
    C: 'Ghost',
    D: 'Summer',
    correct: 'Nymeria',
    tts: `assets/tts/arya_stark's_dire_wolf.mp3`,
    timeout: 3500
}

const question2 = {
    prompt: 'At the end of Season 7, Cersei Lannister sends Euron Greyjoy sailing across the sea to fetch which group of sellswords?',
    A: 'Second Sons',
    B: 'The Golden Company',
    C: 'The Yunkai',
    D: 'Westerosis',
    correct: 'The Golden Company',
    tts: 'assets/tts/sellswords.mp3',
    timeout: 8000
}

const question3 = {
    prompt: 'Brienne pledges allegiance to which of these two people?',
    A: 'Catelyn Stark and Jamie Lannister',
    B: 'Arya Stark and Jamie Lannister',
    C: 'Catelyn Stark and Renly Baratheon',
    D: 'Arya and Sansa Stark',
    correct: 'Catelyn Stark and Renly Baratheon',
    tts: 'assets/tts/brienne_pledge.mp3',
    timeout: 4500
}

const question4 = {
    prompt: 'What is the motto of House Greyjoy?',
    A: 'We Do Not Sow',
    B: 'Hear Me Roar',
    C: 'Unbowed, Unbent, Unbroken',
    D: 'Family, Duty, Honor',
    correct: 'We Do Not Sow',
    tts: 'assets/tts/house_greyjoy_motto.mp3',
    timeout: 4000
}

const question5 = {
    prompt: 'Which type of wine is used in an attempt to poison Daenerys Targaryen?',
    A: 'Dornish Red',
    B: 'Vale White',
    C: 'Stormland Red',
    D: 'Arbor Red',
    correct: 'Arbor Red',
    tts: 'assets/tts/daenerys_poison.mp3',
    timeout: 5000
}

// used to determine which question/answers to display
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
    }, 250)
}

// handles starting the game
$('.start').on('click', function () {
    currentQuestion = 0;
    yourScore = 0;
    currentQuestion++;
    $(this).addClass('hide');
    $('.questions').removeClass('hide');

    questionInterval(question.prompt);
    const tts = question.tts;
    const sound = new Audio(tts);
    sound.play();

    // ends sound if an answer is clicked
    $('.answers').on('click', function () {
        sound.pause();
        sound.currentTime = 0;
    });
        

    function aText() {
        $aOutput.html(question.A);
    }
    setTimeout(aText, question.timeout);

    function bText() {
        $bOutput.html(question.B);
    }
    setTimeout(bText, question.timeout + 2000);

    function cText() {
        $cOutput.html(question.C);
    }
    setTimeout(cText, question.timeout + 4000);

    function dText() {
        $dOutput.html(question.D);
    }
    setTimeout(dText, question.timeout + 6000);

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
    checkQuestion();
    
    questionInterval(question.prompt);
    const tts = question.tts;
    const sound = new Audio(tts);
    sound.play();

    // ends sound if an answer is clicked
    $('.answers').on('click', function () {
        sound.pause();
        sound.currentTime = 0;
    });

    function aText() {
        $aOutput.html(question.A);
    }
    setTimeout(aText, question.timeout);

    function bText() {
        $bOutput.html(question.B);
    }
    setTimeout(bText, question.timeout + 2000);

    function cText() {
        $cOutput.html(question.C);
    }
    setTimeout(cText, question.timeout + 4000);

    function dText() {
        $dOutput.html(question.D);
    }
    setTimeout(dText, question.timeout + 6000);

});

// answer selection
$('#answerA').on('click', function() {
    const answer = $(this).find('#qa').html();
    if (answer === '') { // handles attempts to select an answer while the text is timed out
        return;
    }
    if (answer === question.correct) {
        yourScore++;
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
    $('.victor-form').on('submit', function() {
        $('.game-over').addClass('hide');
        location.reload();
    });
}

// handles the selection of an incorrect answer
function incorrectAnswer() {
    $('.questions').addClass('hide');
    $('.game-over').removeClass('hide');
    $('#your-score').html('Your Score: ' + yourScore);
    $('#loser-submit').on('click', function(event) {
        event.preventDefault();
        let data = $('.loser-form').serializeArray();
        yourName = data[0].value;
        highScores.push(yourName + ': ' + yourScore);
        setHighScore(highScores);
        location.reload();
    })
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
    }
}

loadHighScores();

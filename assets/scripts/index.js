let currentQuestion = 0;
let correctAnswers = 0;

$promptOutput = $('#question-prompt');
$aOutput = $('#qa');
$bOutput = $('#qb');
$cOutput = $('#qc');
$dOutput = $('#qd');

const question1 = {
    prompt: "This is question 1.",
    A: "A text",
    B: "B text",
    C: "C text",
    D: "D text"
}

const question2 = {
    A: "A text",
    B: "B text",
    C: "C text",
    D: "D text"
}

const question3 = {
    A: "A text",
    B: "B text",
    C: "C text",
    D: "D text"
}

const question4 = {
    A: "A text",
    B: "B text",
    C: "C text",
    D: "D text"
}

const question5 = {
    A: "A text",
    B: "B text",
    C: "C text",
    D: "D text"
}


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

function aInterval(string) {
    $aOutput.empty();
    setInterval(function(){
        $aOutput.innerHTML(string);
    }, 1000)
}

$('.start').on('click', function () {
    $(this).addClass('hide');
    $('.questions').removeClass('hide');
    currentQuestion++;
    questionInterval(question1.prompt);
    aInterval(question1.A);
    $("#qb").html(question1.B);
    $("#qc").html(question1.C);
    $("#qd").html(question1.D);
});


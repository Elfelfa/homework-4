var timer = document.querySelector("#timer");
var question = document.querySelector("#question");
var subtext = document.querySelector("#subtext");
var answerList = document.getElementById("answers");
var listEl = document.querySelectorAll('#answers li p');
var nameInput = document.querySelector("#nameInput");
var entry = document.querySelector("#nameEntry");
var result = document.querySelector("#result");
var startBtn = document.querySelector("#startBtn");
var submitBtn = document.querySelector("#submitBtn");

var myAudio = new Audio('');
myAudio.volume = 0.5;

var myTimer = setInterval(countDown, 1000);
var currentQ = 0;
var timeLeft;

const qSets = [
    {
        q: 'What element holds the metadata for the HTML file?',

        a: [
            'A. <header>',
            'B. <head>',
            'C. <main>',
            'D. <footer>'
        ],

        correctAnswer: "B"
    },
    {
        q: 'What object stores several objects inside of it?',

        a: [
            'A. Strings',
            'B. Integers',
            'C. Arrays',
            'D. Doubles'
        ],

        correctAnswer: 'C'
    },
    {
        q: 'Which of the following are the front-end languages we currently use?',

        a: [
            'A. CSS & HTML',
            'B. JavaScript & HTML',
            'C. CSS & JavaScript',
            'D. HTML & Python'
        ],

        correctAnswer: 'A'
    },
    {
        q: 'What number is the first index of any array?',

        a: [
            'A. 1',
            'B. -1',
            'C. Null',
            'D. 0'
        ],

        correctAnswer: 'D'
    },
    {
        q: 'What method combines an array with another?',

        a: [
            'A. combine',
            'B. concat',
            'C. connect',
            'D. compare'
        ],

        correctAnswer: 'B'
    }
];


question.setAttribute('style', 'text-align: center');
subtext.setAttribute('style', 'font-weight: normal; text-align: center;');

startBtn.addEventListener('click', function(event) {
    if(event.target && event.target.matches('canvas'))
    {
        event.preventDefault();
        gameStart();
    }
});

submitBtn.addEventListener('click', function(event) {
    if(event.target && event.target.matches('canvas'))
    {
        event.preventDefault();
        gameReset();
    }
});

answerList.addEventListener('click', function(event) {
    if(event.target && event.target.matches('canvas'))
    {
        event.preventDefault();
        verifyAnswer(event.target.getAttribute('data-number'));
        currentQ++;
        nextQ();
    }
});

function showResult(r)
{
    if (r === true)
    {
        result.textContent = 'Correct!';
        result.setAttribute('class', 'shown');
        setTimeout(function() {result.setAttribute('class', 'hidden');}, 1000);
    }
    else
    {
        result.textContent = 'Incorrect!';
        result.setAttribute('class', 'shown');
        setTimeout(function() {result.setAttribute('class', 'hidden');}, 1000);
    };
}

function nextQ()
{
    if (currentQ < qSets.length)
    {
        var i = 0;

        question.textContent = qSets[currentQ].q;

        for (const child of listEl)
        {
            child.textContent = qSets[currentQ].a[i];
            i++;
        };
    }
    else
    {
        clearInterval(myTimer);
        gameEnd();
    };
}

function verifyAnswer(ans)
{
    if (ans === qSets[currentQ].correctAnswer)
    {
        showResult(true);
        myAudio = new Audio('./assets/sounds/correct.wav');
        myAudio.volume = 0.25;
        myAudio.load();
        myAudio.play();
    }
    else
    {
        timeLeft -= 12;
        showResult(false);
        myAudio = new Audio('./assets/sounds/incorrect.wav');
        myAudio.volume = 0.25;
        myAudio.load();
        myAudio.play();
    };
}

function gameStart()
{
    timeLeft = 90;

    
    startBtn.setAttribute('class', 'hidden');
    question.setAttribute('style', 'text-align: left');
    subtext.setAttribute('style', 'font-weight: bold');
    subtext.setAttribute('class', 'hidden');
    answerList.setAttribute('class', 'shown');
    timer.textContent = "Time: " + timeLeft;
    timer.setAttribute('class', 'shown');

    nextQ();
}

function gameEnd()
{
    question.textContent = 'All done!';
    subtext.textContent = 'Your final score is ' + timeLeft + '.';
    answerList.className = 'hidden';
    subtext.setAttribute('style', 'text-align: left; font-weight: bold;');
    subtext.setAttribute('class', 'shown');
    nameInput.setAttribute('class', 'shown');
}

function gameReset()
{
    
    if (window.localStorage.key(0) === null)
    {
        thisScoreID = 0;
    }
    else
    {
        thisScoreID = localStorage.length;
    }
    console.log('fire');
    var myScore = {name: entry.value.trim(), score: timeLeft};
    window.localStorage.setItem(thisScoreID.toString(), JSON.stringify(myScore));
    window.location = "./highscores.html";
}

function countDown()
{
    if (timer.getAttribute('class') != 'hidden')
    {
        timeLeft--;
    };

    timer.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0)
    {
        clearInterval(myTimer);
        timeLeft = 0;
        gameEnd();
    };
}

var scoreList = document.getElementById("answers");
var title = document.querySelector("#question");
var resetBtn = document.querySelector("#clearHSBtn");
var goBackBtn = document.querySelector("#returnBtn");

var scores = [];

resetBtn.addEventListener('click', clearScores);
goBackBtn.addEventListener('click', goBack);

title.setAttribute('style', 'text-align: left');

for (var i = 0; i < localStorage.length; i++)
{
    scores.push(JSON.parse(localStorage.getItem(i)));
}

if (scores.length > 1)
{
    sortScores();
};

for (var i = 0; i < scores.length; i++)
{
    var li = document.createElement('li');
    li.setAttribute('style', 'background-color: #EFE7FA; color: black; font-weight: bold; font-size: 16px; text-align:left; width: 100%; height: 20px; border-radius: 0px; border: none;');
    li.innerHTML = scores[i].name + '  -  ' + scores[i].score;

    scoreList.appendChild(li);
}

function clearScores()
{
    localStorage.clear();
    window.location.reload();
}

function sortScores()
{
    console.log(scores);

    for (var i = 0; i < scores.length; i++)
    {
        let currentBest = scores[i];
        let j = i - 1;

        while ((j > -1) && (parseInt(currentBest.score) > parseInt(scores[j].score)))
        {
            scores[j+1] = scores[j];
            j--;
        }
        scores[j+1] = currentBest;
    }
    console.log(scores);
}

function goBack()
{
    window.location = "./index.html";
}
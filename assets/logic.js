var word = document.querySelector('#word')
var text = document.querySelector('#text')
var scoreEl = document.querySelector('#score')
var timeEL = document.querySelector('#time')
var endgameEl = document.querySelector('#end-game-container')
var settingsBtn = document.querySelector('#setings-btn')
var settings = document.querySelector('#settings')
var settingsForm = document.querySelector('settings-form')
var difficultySelect = document.querySelector('#difficulty')

const words = ['computer', 'geek', 'visual', 'cascade', 'programming', 'python', 'summit', 'encrypted', 'syntax', 'parabala', 'logistics', 'sequence', 'solidity', 'javascript'];

//Init word 

let randomWord;

//Init score

let score = 0;

//Init time

let time = 10;

//Init difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Select difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

//Add word to DOM
function addWordtoDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//Update time

function updateTime(){
    time--;
    timeEL.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        // end game
        gameOver()
    }
}

//Game over, show end screen
function gameOver(){
    endgameEl.innerHTML = '<h1> Time out!</h2><p>Your final score is:' + score + '</p><button onclick="location.reload()">Reload</button>';
    endgameEl.style.display = 'flex'
}

addWordtoDOM()

//Typing
text.addEventListener('input', e=> {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordtoDOM() 
        updateScore()
        e.target.value = ''
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 4;
        }
        updateTime();
    }
})

//Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
const keyboard = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
const btnStart = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

//Removes overlay
btnStart.addEventListener('click', () => {
    btnStart.parentNode.style.display = 'none';
});

//Phrases to be found
let phrases = [
    "The arctic king eats snow",
    "Queen B is number one",
    "Sell ice on Antartica",
    "A polar bear in Sahara",
    "Smelly feet"
];

// Generate random phrases
const getRandomPhraseAsArray = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);

    const result = arr[randomIndex];
    
    return result.split("");
};

const randomPhrase = getRandomPhraseAsArray(phrases);

// Add the random phrase to be displayed in game
const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const list = document.createElement('li');
        list.textContent = arr[i];
            if(list.textContent !== ' ') {
                list.className = 'letter';
            } else {
                list.className = 'space';
            };
        phrase.append(list);
    };
};

addPhraseToDisplay(randomPhrase);

//Checks if guessed letter is correct or not
const checkLetter = (button) => {
    let letterToBeMatched = document.querySelectorAll('.letter');
    let match = null;

    for (let i = 0; i < letterToBeMatched.length; i++) {
        if (button.textContent === letterToBeMatched[i].textContent.toLowerCase()) {
            letterToBeMatched[i].classList.add('show');
            match = letterToBeMatched[i].textContent;
        };
    };
        return match;
};

//Removes hearts from counter
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        
        const button = e.target;
        button.className = 'chosen';
        
        const letterFound = checkLetter(button);
        button.disabled = true;
        
        if (letterFound === null) {
            const life = document.querySelectorAll('.tries img');
            life[missed].src = 'images/lostHeart.png';
            missed++;
        }; 
    };
    
    //Checks if player has won or lost
    const checkwin = () => {
        
        const letters = document.querySelectorAll('.letter');
        const show = document.querySelectorAll('.show');
        const title = document.querySelector('.title');

            if(show.length === letters.length) {
                overlay.classList.add('win');
                title.textContent = 'You won, such a MVP!';
                overlay.style.display = 'flex';
                btnStart.textContent = 'Restart game';
            } else if (missed >= 5) {
                overlay.classList.add('lose');
                title.textContent = 'You lost, ya filthy bugger!';
                overlay.style.display = 'flex';
                btnStart.textContent = 'Restart game';
            };
    };
    checkwin();
});

btnStart.addEventListener('click', (e) => {
    if(e.target.textContent === 'Restart game') {

        //Remove class chosen from letters
        const button = document.querySelectorAll('button');
            for(i = 0; i < button.length; i++) {
                button[i].classList.remove('chosen');
                button[i].removeAttribute('disabled');
            }

        //Remove previous class from overlay
        overlay.classList.remove('win', 'lose');
        
        //Remove previously added phrase from display
        while (phrase.hasChildNodes())
        phrase.removeChild(phrase.firstChild);

        //Let missed go back to 0
        missed = 0;

        //Generate new random phrase
        const randomPhrase = getRandomPhraseAsArray(phrases);

        //Add phrase to display
        addPhraseToDisplay(randomPhrase);

        //Restore lives
        const life = document.querySelectorAll('.tries img');
        life.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });

    };
});
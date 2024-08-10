'use strict';

const score0 = document.getElementById('score--0'); // can be done by queryselector as well. then it requires #
const score1 = document.getElementById('score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const score = document.querySelector('.score');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const win = new Audio('files/win.mp3');
const click = new Audio('files/click.mp3');
const Switch = new Audio('files/switch.mp3');

let scores = [0, 0];
let currScore = 0;
let activeplayer = 0;
let state = true;

const random = function () {
    return Math.floor(Math.random() * 6) + 1;
}
let playerswitch = function () {
    currScore = 0;
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
let setter = function () {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    document.getElementById(`score--${activeplayer}`).textContent = 0;
    document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activeplayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
}

score1.textContent = score0.textContent = '0'
dice.classList.add('hidden');

btnRoll.addEventListener('click', function () {
    if (state) {
        click.play();
        let diceroll = random()

        dice.classList.remove('hidden');
        dice.src = `files/dice-${diceroll}.png`;
        currScore += diceroll;
        document.getElementById(`current--${activeplayer}`).textContent = currScore;
        if (diceroll === 1) {
            playerswitch();
            Switch.play();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (state) {
        click.play();
        scores[activeplayer] += currScore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
        if (scores[activeplayer] >= 100) {
            win.play();
            state = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
        }
        else {
            playerswitch();
        }
    }
});

btnNew.addEventListener('click', function () {
    click.play();
    state = true;
    scores = [0, 0];
    currScore = 0;
    activeplayer = 1;
    setter();
    activeplayer = 0;
    setter();
});


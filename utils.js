import { ATTACK, HIT } from "./config.js";
import { player1, player2 } from "./players.js";
import { generateLogs } from "./logs.js";


const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const getRandom = (num) =>  Math.ceil(Math.random() * num);

export function changeHP(randomNumber) {
    this.hp -= randomNumber;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

export function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}

export function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

export const playerWins = (name) => {
    const $titleWins = createElement('div', 'winsTitle');
    if (name) {
        $titleWins.innerText = `${name} wins`;
    } else {
        $titleWins.innerText = 'draw';
    }

    return $titleWins;
}

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }

}

export const playerAttack = () => {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

export const createPlayer = (objPlayer) => {

    const {name, img, hp, player} = objPlayer;

    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $img.src = img;
    $name.innerText = name;
    $life.style.width = `${hp}%`;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}


function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}

export const showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight[6].disabled = true;
        createReloadButton()
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}


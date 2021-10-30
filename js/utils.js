import { ATTACK, HIT } from "./config.js";

const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');

export const randomArena = () => {
    $arenas.classList.add(`arena${getRandom(5)}`);
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const getRandom = (num) =>  Math.ceil(Math.random() * num);

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

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.pathname = 'index.html';
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}



import { createElement } from "./utils.js";

export default class Player {
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.rootselector = props.rootselector;
    }

    changeHP = (randomNumber) => {
        this.hp -= randomNumber;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }

    createPlayer = () => {
        const $arenas = document.querySelector(`.${this.rootselector}`);
        const $player = createElement('div', `player${this.player}`);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');

        $img.src = this.img;
        $name.innerText = this.name;
        $life.style.width = `${this.hp}%`;

        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);

        $arenas.appendChild($player);
    }

}
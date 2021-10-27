// import { changeHP, elHP, renderHP } from "./utils.js";

class Player {
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
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
}

export const player1 = new Player({
        player: 1,
        name: 'Sub-Zero',
        hp: 100,
        // img: 'https://i.gifer.com/4SHX.gif',
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['sword', 'fist', 'spear']
});

// console.log(player1.changeHP);

export const player2 = new Player({
    player: 2,
    name: 'Sckorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    // img: 'https://i.gifer.com/1kPL.gif',
    weapon: ['kunai', 'fist', 'chein']
});
import { changeHP, elHP, renderHP } from "./utils.js";

export const player1 = {
    player: 1,
    name: 'Sub-Zero',
    hp: 10,
    // img: 'https://i.gifer.com/4SHX.gif',
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'fist', 'spear'],
    changeHP,
    renderHP,
    elHP
};

export const player2 = {
    player: 2,
    name: 'Sckorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    // img: 'https://i.gifer.com/1kPL.gif',
    weapon: ['kunai', 'fist', 'chein'],
    changeHP,
    renderHP,
    elHP
};
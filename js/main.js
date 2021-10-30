import Player from './players.js';
import { enemyAttack, playerAttack, createReloadButton, playerWins, randomArena } from './utils.js';
import { generateLogs } from './logs.js';


const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');

let player1;
let player2;

class Game {
    showResult = () => {
        if (player1.hp === 0 && player2.hp !== 0) {
            generateLogs('end', player2, player1);
            $arenas.appendChild(playerWins(player2.name));
        }
        if (player1.hp !== 0 && player2.hp === 0) {
            generateLogs('end', player1, player2);
            $arenas.appendChild(playerWins(player1.name));
        }
        if (player1.hp === 0 && player2.hp === 0) {
            generateLogs('draw');
            $arenas.appendChild(playerWins());
        }
    }

    start = async () => {
        const p1 = await JSON.parse(localStorage.getItem('player1'));
        const p2 = await JSON.parse(localStorage.getItem('player2'));

        player1 = new Player({
            ...p1,
            player: 1,
            hp: 100,
            rootselector: 'arenas',
        });

        player2 = new Player({
            ...p2,
            player: 2,
            hp: 100,
            rootselector: 'arenas',
        });

        player1.createPlayer();
        player2.createPlayer();

        generateLogs('start', player1, player2);
    }
}

randomArena();

const game = new Game();

game.start();

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
    const { hit, defence, value } = playerAttack();
    if (hit !== defenceEnemy) {
        player2.changeHP(value);
        player2.renderHP();
        generateLogs('hit', player1, player2, value);
        generateLogs('defence', player1, player2);
    }
    if (hitEnemy !== defence) {
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs('hit', player2, player1, valueEnemy);
        generateLogs('defence', player2, player1);
    }

    if (player1.hp === 0 || player2.hp === 0) {
        game.showResult();
        createReloadButton();
    }

});


import { createPlayer, enemyAttack, playerAttack, showResult } from "./utils.js";
import { player1, player2 } from "./players.js";
import { generateLogs } from "./logs.js";


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
        generateLogs('defence', player1, player2);

    }

    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1);
        generateLogs('defence', player2, player1);
    }

    showResult();
});

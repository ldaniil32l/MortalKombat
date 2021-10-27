import { createPlayer, enemyAttack, playerAttack, showResult } from "./utils.js";
import { player1, player2 } from "./players.js";
import { generateLogs } from "./logs.js";


export default class Game {
    start = () => {
        const $arenas = document.querySelector('.arenas');
        const $formFight = document.querySelector('.control');

        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));

        generateLogs('start', player1, player2);

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

            showResult();
        });
    }
}


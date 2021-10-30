import { getRandom } from "./utils.js";
import { LOGS } from "./config.js";

const $chat = document.querySelector('.chat');

export const generateLogs = (type, {name} = {}, {name: playerName2, hp} = {}, valueAttack) => {
    const len = LOGS[type].length - 1;
    let text;
    let el;
    switch (type) {
        case 'start':
            const time = new Date().toLocaleTimeString();
            text = LOGS[type].replace('[time]', time).replace('[player1]', name).replace('[player2]', playerName2);
            el = `<p class="logGreen">${text}</p>`;
            break;
        case 'hit':
            text = LOGS[type][getRandom(len)].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
            text = `${text} -${valueAttack} [${hp}/100]`
            el = `<p class="logRed">${text}</p>`;
            break;
        case 'end':
            text = LOGS[type][getRandom(len)].replace('[playerWins]', name).replace('[playerLose]', playerName2);
            el = `<p class="logYellow">${text}</p>`;
            break;
        case 'defence':
            text = LOGS[type][getRandom(len)].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
            el = `<p class="logGreen">${text}</p>`;
            break;
        case 'draw':
            text = LOGS[type];
            el = `<p class="logYellow">${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}
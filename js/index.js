import { getRandom } from "./utils.js";

// выбор рандомного персонажа противника
let imgPlayer2; // переменная для gif
let namePlayer2; // переменная для name
let randomID = getRandom(24);
let i = 0;
while (randomID == 11) {
    randomID = getRandom(24);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const $parent = document.querySelector('.parent');
const $player1 = document.querySelector('.player1');
const $player2 = document.querySelector('.player2');
let objPlayer2;

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = '../assets/selectFighter/default.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = await fetch('../assets/selectFighter/fighters.json').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        // console.log(item);
        if (item.id === 11){
            return;
        }
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        if (item.id === randomID) {
            imgPlayer2 = item.img;
            namePlayer2 = item.name;
            objPlayer2 = item;
        }

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img1 = createElement('img');
                const $name1 = createElement('p', 'name');
                $name1.innerText = item.name;
                $img1.src = imgSrc;
                $player1.appendChild($img1);
                $player1.appendChild($name1);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player1.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            localStorage.setItem('player1', JSON.stringify(item));
            if (item.id === randomID)
                el.classList.add('activeDouble');
            el.classList.add('active');

            setTimeout(() => {
                window.location.pathname = 'arenas.html';
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });

    async function selectPlayer2() {
        const $img2 = createElement('img');
        const $name2 = createElement('p', 'name');

        $player2.appendChild($img2);
        $player2.appendChild($name2);

        for (let i = 0; i < 6; i++) {
            let randSelect = getRandom(24);
            while (randSelect == 11) {
                randSelect = getRandom(24);
            }
            const $tempPlayer2 = document.querySelector(`.div${randSelect}`);
            $tempPlayer2.classList.add('activeRed');
            // добавление gif выбранного персонажа соперником
            $name2.innerText = players[randSelect - 1]['name'];
            $img2.src = players[randSelect - 1]['img'];
            await sleep(300);
            $tempPlayer2.classList.remove('activeRed');
        }
        // добавление gif выбранного персонажа соперником
        const $characterPlayer2 = document.querySelector(`.div${randomID}`);
        $img2.src = await imgPlayer2;
        $name2.innerText = await namePlayer2;

        // добавление соперника в localStorage
        localStorage.setItem('player2', JSON.stringify(objPlayer2));
        // setTimeout для задержки перед вбор игрока соперника
        $characterPlayer2.classList.add('activeRed');
    }

    selectPlayer2();

}

init();

const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 25,
    foot: 20
}

const ATTACK = ['head', 'body', 'foot']

const player1 = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'https://i.gifer.com/4SHX.gif',
    // img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'fist', 'spear'],
    attack,
    changeHP,
    renderHP,
    elHP
}


const player2 = {
    player: 2,
    name: 'Sckorpion',
    hp: 100,
    // img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    img: 'https://i.gifer.com/1kPL.gif',

    weapon: ['kunai', 'fist', 'chein'],
    attack,
    changeHP,
    renderHP,
    elHP
}

function attack() {
    console.log(this.name + ' Fight...');
}


function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}


function createPlayer(objPlayer) {
    const $player = createElement('div', 'player'+objPlayer.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $img.src = objPlayer.img;
    $name.innerText = objPlayer.name;
    $life.style.width = objPlayer.hp + '%';

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}


function changeHP(randomNumber) {
    this.hp -= randomNumber;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}


function elHP(){
    return document.querySelector('.player' + this.player + ' .life')
}


function renderHP() {
    this.elHP().style.width = this.hp + '%';
}


function getRandom(num) {
    return Math.ceil(Math.random() * num);
}


function playerWins(name) {
    const $titleWins = createElement('div', 'winsTitle');
    if (name) {
        $titleWins.innerText = name + ' wins';
    } else {
        $titleWins.innerText = 'draw';
    }

    return $titleWins;
}


function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}


// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));

//     player1.renderHP();
//     player2.renderHP();

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton()
//     }
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins());
//     }
// });


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }

}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    console.dir($formFight);
    const enemy = enemyAttack()
    const attack = {}

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
    console.log('####: a', attack);
    console.log('####: e', enemy);

    if (attack.hit != enemy.defence) {
        player2.changeHP(attack.value);
    }

    if (enemy.hit != attack.defence) {
        player1.changeHP(enemy.value);
    }

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight[6].disabled = true;
        createReloadButton()
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }

});

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');


const player1 = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'fist', 'spear'],
    attack: function () {
        console.log(player1.name + fight(player1.name + 'Fight...'));
    }
}

const player2 = {
    player: 2,
    name: 'Sckorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'fist', 'chein'],
    attack: function () {
        console.log(player2.name + fight(player2.name + 'Fight...'));
    }
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function randomDamage(){
    damage = Math.ceil(Math.random() * 20);
    return damage
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randomDamage();
    if (player.hp <= 0) {
        $playerLife.style.width = 0;
        if (player.player === 1){
            $arenas.appendChild(winsPlayer(player2.name));
        }
        else {
            $arenas.appendChild(winsPlayer(player1.name));
        }
        $randomButton.disabled = true;
    }
    else {
        $playerLife.style.width = player.hp + '%';
    }
}

function losePlayer(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
    return $loseTitle;
}

function winsPlayer(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = name + ' wins';
    return $winsTitle;
}

$randomButton.addEventListener('click', function() {
    console.log('Fight');
    changeHP(player1);
    changeHP(player2);

});

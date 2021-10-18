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
    },
    changeHP: changeHP,
    renderHP: renderHP
}


const player2 = {
    player: 2,
    name: 'Sckorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'fist', 'chein'],
    attack: function () {
        console.log(player2.name + fight(player2.name + 'Fight...'));
    },
    changeHP: changeHP,
    renderHP: renderHP
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


function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}


function elHP(){
    return document.querySelector('.player' + this.player + ' .life')
}


function renderHP() {
    const $lifePlayer = elHP.call(this);
    $lifePlayer.style.width = this.hp + '%';
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
    console.log($titleWins);

    return $titleWins;
}


function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);

    return $reloadWrap;
}


$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
        const $reloadButton = document.querySelector('.reloadWrap .button');
        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        });
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        console.log(playerWins(player1.name));
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        console.log(playerWins(player1.name));
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        console.log(playerWins());
        $arenas.appendChild(playerWins());
    }
});


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const player1 = {
    name: 'Sub-Zero',
    hp: 60,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'fist', 'spear'],
    attack: function () {
        console.log(player1.name + fight(player1.name + 'Fight...'));
    }
}

const player2 = {
    name: 'Sckorpion',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'fist', 'chein'],
    attack: function () {
        console.log(player2.name + fight(player2.name + 'Fight...'));
    }
}

function createPlayer(strPlayer, objPlayer) {
    const $player1 = document.createElement('div');
    $player1.classList.add(strPlayer);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = objPlayer.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText =objPlayer.name;


    const $img = document.createElement('img');
    $img.src = objPlayer.img;


    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1;
let y = 10;

for (let i = 0; i < excel.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;

}

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')]

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody')
}

snakeBody[0].classList.add('snakeHead')

let apple;

function createApple() {
    function generateApple() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    let appleCoordinates = generateApple();
    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');

    while (apple.classList.contains('snakeBody') || apple.classList.contains('snakeHead')) {
        console.log('Contains');
        let appleCoordinates = generateApple();
        apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');

    }
    apple.classList.add('apple');
}
createApple();


let direction = 'right';
let steps = false;

let result = document.createElement('div');
document.body.appendChild(result);
result.classList.add('result');
let divScore = document.createElement('div');
divScore.classList.add('divScore');
result.appendChild(divScore);

let score = 0;
divScore.innerHTML = `Ваши очки: ${score} `;



function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    for (let i = 0; i < excel.length; i++) {
        excel[i].classList.remove('down');
        excel[i].classList.remove('up');
        excel[i].classList.remove('right');
        excel[i].classList.remove('left');
    }
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));

        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));

        }
        snakeBody[0].classList.add('right');

    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));


        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));

        }
        snakeBody[0].classList.add('left');
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));

        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1'));

        }
        snakeBody[0].classList.add('up');
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));

        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));

        }
        snakeBody[0].classList.add('down');
    }

    if (snakeBody[0].getAttribute('posX') === apple.getAttribute('posX')
        && snakeBody[0].getAttribute('posY') === apple.getAttribute('posY')) {
        apple.classList.remove('apple');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createApple();
        score++;
        divScore.innerHTML = `Ваши очки: ${score}`;
    }


    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            let divGameOver = document.createElement('div');
            divGameOver.classList.add('divGameOver');
            document.body.appendChild(divGameOver);
            divGameOver.innerHTML = `Игра окончена. Ваш результат  ${score}`
            let buttonReload = document.createElement('button');
            buttonReload.classList.add('buttonReload');
            divGameOver.appendChild(buttonReload);
            buttonReload.innerHTML = 'Перезапустить игру'
            buttonReload.addEventListener('click', (e) => {
                window.location.reload()
            });
        }, 200);

        clearInterval(interval);
        snakeBody[0].style.background = 'url(./img/Snake_Blood.png) center no-repeat';
        snakeBody[0].style.backgroundSize = 'cover';

    }

    snakeBody[0].classList.add('snakeHead');
    for (let i = 1; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    }

    steps = true;
}


let interval = setInterval(move, 1000);
window.addEventListener('keydown', function (e) {
    if (steps === true) {
        if (e.key === 'ArrowLeft' && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        else if (e.key === 'ArrowUp' && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        else if (e.key === 'ArrowRight' && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        else if (e.key === 'ArrowDown' && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }

})
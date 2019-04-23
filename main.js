"use strict";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(81));
}
const arrColors = ["red", "blue", "green", "yellow", "violet"];
const gameField = [];

/*function Count() {
  let b = 0;
  for (let i = 0; i < gameField.length; i++) {
    if (gameField[i] != 0) {
      b++;
    }
  }
  console.log(b);
}
function Amount() {
  let filtered = gameField.filter(function(elem) {
    if (elem != 0) {
      return true;
    } {
      return false
    }
 })
 console.log(filtered.length);
} */
function Count() {
  let result = gameField.reduce(function (amount, elem) {
    if (elem != 0) {
      return amount + 1;
    } else {
      return amount;
    }
  }, 0); return result;
}
function EndGame() {
  let result = Count();
  if ((81 - result) <= 3) {
    alert('endgame');
    return true;

  } {
    return false;
  }
}

function createLines() {
  for (let i = 0; i < 81; i++) {
    if (i % 8 == 0) {
      gameField[i] = 3;
    }
    if (i % 10 == 0) {
      gameField[i] = 3;
    }
    if (i < 18 && i > 8) {
      gameField[i] = 2;
    }
    if (i % 9 == 0) {
      gameField[i] = 1;
    }
  }
  ShowField()
}

function createBall(x, y, colors) {
  if (gameField[toIndex(x, y)] == 0) {
    gameField[toIndex(x, y)] = colors;
  }
}
function setLines() {
  for (let i = 0; i < 9; i++) {
    createBall(0, i, 1);
  }
  for (let i = 0; i < 9; i++) {
    createBall(i, 1, 2);
  }
  for (let i = 0; i < 9; i++) {
    createBall(i, i, 3);
    createBall(i, 8 - i, 3);
  }
  ShowField()
}

function countBall() {
  let result = gameField.reduce(function (amount, elem) {
    if (amount[elem]) {
      amount[elem] = amount[elem] + 1;
    }
    else {
      amount[elem] = 1
    }
    return amount
  }, []);
  console.log(result);
  return result;
}


function toIndex(x, y) {
  return x + y * 9;
}


function countIndex(index) {
  return [
    Math.floor(index / 9),
    index % 9
  ];
}



function makeGameField() {
  for (var b = 0; b < 81; b++) {
    var i = $(`<div class="Item" data-index=${b}></div>`);
    $('.container').append(i);
  }
}

function init() {
  for (let i = 0; i < 81; i++) {
    gameField[i] = 0;
  }
}

function ShowField() {

  $(".Item").each((index, element) => {

	const current_color = gameField[index] - 1
	
	
    if (arrColors[current_color]) {

	  $(element).attr('color', arrColors[current_color])
	  $(element).addClass('testb');
    } else {

	  $(element).attr('color', '')
	  
    }
  })
}

$("a.click").click(function () {
  make3Balls()
  minBall()


  /*for (let u = 0; u < 3; u++) {
    $(`.Item:eq(${getRandomInt()})`).addClass('');
  } */
});

function make3Balls() {
  let added = 0

  while (added < 3) {
    let randomCell = Math.floor(Math.random() * 81)

    if (!gameField[randomCell]) {
      gameField[randomCell] = 1 + Math.floor(Math.random() * 5)
      added++
    }
  }
  ShowField()
  EndGame()
}
function minBall() {
  let min = 99;
  let max = 0;
  for (let i = 1; i < gameField.length; i++) {
    if (gameField[i] > max) max = gameField[i];
    if ((gameField[i] < min) && (gameField[i] != 0)) {
      min = gameField[i];
    }
  }
  console.log(min, max);
}
function Sort() {
  for (let j = 0; j < gameField.length - 1; j++) {
    for (let i = j + 1; i < gameField.length; i++) {
      if ((gameField[i] < gameField[j]) && (gameField[i] != 0)) {
        let a = gameField[i];
        gameField[i] = gameField[j];
        gameField[j] = a;
      }
    }
  }
  console.log(gameField);
}
$("a.reset").click(function () {
  init()
  make3Balls()
});

let elementClicked = null;
let cells = [];

// check 5 elements in line
function checkScore(index,color){

  return false;
}

$(document).ready(function () {
  makeGameField()
  init()
  cells = $(".Item")

  cells.on('click', function(e) {
    let index = $(e.target).index();

    if (elementClicked == null) {
      if (gameField[index]) {
        elementClicked = index
      }
    } else {
      if (gameField[index]) {
        elementClicked = index
      } else {
        gameField[index] = gameField[elementClicked]
        gameField[elementClicked] = 0
        elementClicked = null;

        if (!checkScore(index)) {
          make3Balls()
        }
      }
    }
    ShowField();
  })


});

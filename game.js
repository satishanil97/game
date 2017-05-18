var n1 = 0; //number of coins placed by player 1
var n2 = 0; //number of coins placed by player 2
cid = 0;    //coin id
var state = 0;  //(state = 0) => placing new coins, (state = 1) => moving existing coins
var chance = 1; //who's chance it is --> player-1 or player-2
var selected = null;

function initialize() {
  n1 = 0;
  n2 = 0;
  state = 0;
  chance = 1;
  cid = 0;
  selected = null;
}

function winner() {
  var i = 0;
  var j = 0;

  //horizontal possibilities
  while(i < 9) {
    var c1 = document.getElementById(i.toString()).children;
    var c2 = document.getElementById((i+1).toString()).children;
    var c3 = document.getElementById((i+2).toString()).children;

    if((c1.length == 0) || (c2.length == 0) || (c3.length == 0)){
      i = i + 3;
      continue;
    }

    var id1 = parseInt(c1[0].id);
    var id2 = parseInt(c2[0].id);
    var id3 = parseInt(c3[0].id);
    var sum = (id1%2) + (id2%2) + (id3%2); //if sum = 0 => player1 has won, if sum = 3 => player2 has won
    if(sum == 0){
      return 1;
    }

    else if (sum == 3) {
      return 2;
    }

    i = i + 3;
  }

  //vertical possibilities
  i = 0;
  while(i < 3) {
    var c1 = document.getElementById(i.toString()).children;
    var c2 = document.getElementById((i+3).toString()).children;
    var c3 = document.getElementById((i+6).toString()).children;

    if((c1.length == 0) || (c2.length == 0) || (c3.length == 0)){
      i = i + 1;
      continue;
    }

    var id1 = parseInt(c1[0].id);
    var id2 = parseInt(c2[0].id);
    var id3 = parseInt(c3[0].id);
    var sum = (id1%2) + (id2%2) + (id3%2); //if sum = 0 => player1 has won, if sum = 3 => player2 has won
    if(sum == 0){
      return 1;
    }

    else if (sum == 3) {
      return 2;
    }

    i = i + 1;
  }

  //diagonal possibilities
  var c1 = document.getElementById("0").children;
  var c2 = document.getElementById("4").children;
  var c3 = document.getElementById("8").children;

  if((c1.length != 0) && (c2.length != 0) && (c3.length != 0)){
    var id1 = parseInt(c1[0].id);
    var id2 = parseInt(c2[0].id);
    var id3 = parseInt(c3[0].id);
    var sum = (id1%2) + (id2%2) + (id3%2); //if sum = 0 => player1 has won, if sum = 3 => player2 has won
    if(sum == 0){
      return 1;
    }

    else if (sum == 3) {
      return 2;
    }
  }

  var c1 = document.getElementById("2").children;
  var c2 = document.getElementById("4").children;
  var c3 = document.getElementById("6").children;

  if((c1.length != 0) && (c2.length != 0) && (c3.length != 0)){
    var id1 = parseInt(c1[0].id);
    var id2 = parseInt(c2[0].id);
    var id3 = parseInt(c3[0].id);
    var sum = (id1%2) + (id2%2) + (id3%2); //if sum = 0 => player1 has won, if sum = 3 => player2 has won
    if(sum == 0){
      return 1;
    }

    else if (sum == 3) {
      return 2;
    }
  }

  //no winner
  return 0;
}

/*
function coinClick(id) {
  if(state == 0) {
    return;
  }
  if(selected != null) {
    return;
  }
  if((chance == 1) && (document.getElementById(id).background == "yellow")) {
    return;
  }
  if((chance == 2) && (document.getElementById(id).background == "red")) {
    return;
  }

  selected = document.getElementById(id);
  selected.background = "aqua";

  return;
}
*/

function checkWinner() {
  var result = winner();
  if(result != 0) {
    alert("Player-" + result + " Wins!!");
    location.reload();
  }
}


function possible(fromId,toId) {
  var from = parseInt(fromId);
  var to = parseInt(toId);
  var diff = to - from;
  var moddiff = (to%3) - (from%3);

  if(from > to) {
    diff = from - to;
  }

  if(diff > 4) {
    return false;
  }

  if(from%3 > to%3) {
    moddiff = (from%3) - (to%3);
  }

  if(moddiff == 2) {
    return false;
  }

  return true;
}


function holderClick(id) {
  if(state == 0){
    var nodes = document.getElementById(id).childNodes;
    if(nodes.length > 0){
      return;
    }

    else{
      if(chance == 1) {
        var coinid = 10 + cid;
        cid = cid + 1;
        var coin = '<div class=\"coin1\" id=\"' + coinid + '\"></div>';
        document.getElementById(id).innerHTML = coin;
        n1 = n1 + 1;
        chance = 2;
        checkWinner();
        document.getElementById("player").innerHTML = "Player-2\'s turn";
      }

      else if(chance == 2) {

        var coinid = 10 + cid;
        cid = cid + 1;
        var coin = "<div class=\"coin2\" id=\"" + coinid + "\"></div>";
        document.getElementById(id).innerHTML = coin;
        n2 = n2 + 1;
        chance = 1;
        document.getElementById("player").innerHTML = "Player-1\'s turn";

        if(n2 == 3) {
          state = 1;
          checkWinner();
          return;
        }
      }
    }
  }

  else if(state == 1) {
    var child = document.getElementById(id).children;

    if((selected != null)&&(selected.parentNode.id == id)) {    //cancel selection
      if(chance == 1) {
        selected.style.background = "red";
      }

      else {
        selected.style.background = "yellow";
      }

      selected = null;
      return;
    }

    if((selected != null)&&(child.length > 0)) {
      return;
    }

    else if ((selected == null) && (child.length == 0)) {
      return;
    }

    if(child.length > 0) {
      if((chance == 1) && (parseInt(child[0].id)%2 != 0)) {
        return;
      }
      if((chance == 2) && (parseInt(child[0].id)%2 == 0)) {
        return;
      }
    }

    if(selected == null){ //selecting
      selected = child[0];
      selected.style.background = "green";
      return;
    }

    else {    //placing

      var coinId = selected.id;
      var parentId = selected.parentNode.id;
      if(!possible(parentId,id)) {
        return;
      }

      $('#' + selected.id).appendTo('#' + id);
      checkWinner();
      selected = null;
      if(chance == 1){
        document.getElementById("player").innerHTML = "Player-2\'s turn";
        chance = 2;
        document.getElementById(coinId).style.background = "red";
      }

      else {
        document.getElementById("player").innerHTML = "Player-1\'s turn";
        chance = 1;
        document.getElementById(coinId).style.background = "yellow";
      }
      return;
    }

  }

}


document.addEventListener('DOMContentLoaded', function() {
    initialize();
}, false);

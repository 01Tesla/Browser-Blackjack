/* --- Main Code --- */

//track card sums and player credits
var dealerCardSum = 0;
var playerCardSum = 0;

var dealerCards = [];
var playerCards = [];

var playerAccount = 0;

//track aces to calculate CardSum
var dealerAceCount = 0;
var playerAceCount = 0;

//booleans to allow buttons
var below21 = false;
var canSplit = false;
var gameRunning = false;

var deck;

var hiddenCard;

window.onload = function(){
    getDeck();
    shuffle();
    startGame();
}



/* --- cards, deck and related functions --- */

let suits = ["spades", "diamonds", "heart", "club"];
let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class card{
    constructor(suit, value, icon){
        this.suit = suit;
        this.value = value;
    }
}

function getDeck(){
    deck = new Array();

    for(let i=0; i < suits.length; i++){
        for(let j=0; j<values.length; j++){
            deck.push(new card(suits[i], values[j]));
        }
    }
}

function shuffle(){
    for(let i=0; i<100; i++){
        randInt1 = Math.floor(Math.random() * deck.length);
        randInt2 = Math.floor(Math.random() * deck.length);

        temp = deck[randInt1];
        deck[randInt1] = deck[randInt2];
        deck[randInt2] = temp;
    }
}



/* --- game logic functions --- */
function startGame(){
    //deal first round
    playerCards[0] = deck.pop();
    playerCardSum = playerCardSum + getCardValue(playerCards[0]);
    if(checkAce(playerCards[0])){
        playerAceCount++;
    }

    hiddenCard = deck.pop();
    dealerCards[0] = hiddenCard;

    //deal second round
    playerCards[1] = deck.pop();
    playerCardSum = playerCardSum + getCardValue(playerCards[1]);
    if(checkAce(playerCards[1])){
        playerAceCount++;
    }

    dealerCards[1] = deck.pop();
    dealerCardSum = dealerCardSum + getCardValue(dealerCards[1]);
    if(checkAce(dealerCards[1])){
        dealerAceCount++;
    }

    //test print
    for(let i=0; i<playerCards.length; i++){
        console.log(playerCards[i].suit + " " + playerCards[i].value);
    }
    console.log(playerCardSum);

}

function getCardValue(card){
    var value = 0;
    if(card.value == "J" || card.value == "Q" || card.value == "K"){
        value = 10;
    }
    else if(card.value == "A"){
        value = 11;
    }
    else{
        value = card.value;
    }

    return value;
}

function checkAce(card){
    if(card.value == "A"){
        return true;
    }
    else{
        return false;
    }
}


/* --- button onclick functions functions --- */
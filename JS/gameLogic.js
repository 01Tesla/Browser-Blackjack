
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
    var deck = new Array();

    for(let i=0; i < suits.length; i++){
        for(let j=0; j<values.length; j++){
            deck.push(new card(suits[i], values[j]));
        }
    }

    return deck;
}

function shuffle(deck){
    for(let i=0; i<100; i++){
        randInt1 = Math.random()*52;
        randInt2 = Math.random()*52;

        temp = deck[randInt1];
        deck[randInt1] = deck[randInt2];
        deck[randInt2] = temp;
    }
}


/* --- Main Code --- */
var dealerCardSum = 0;
var playerCardSum = 0;

var playerAccount = 0;

//track aces to calculate CardSum
var dealerAceCount = 0;
var playerAceCount = 0;

//booleans to allow buttons
var canHit = false;
var canSplit = false;
var gameRunning = false;

var deck = getDeck();
shuffle(deck);

for(let i=0; i<deck.length; i++){
    console.log(deck[i].suit + " " + deck[i].value); 
}

/* -- game loop -- */


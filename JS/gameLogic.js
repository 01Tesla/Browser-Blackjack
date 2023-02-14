/* --- Main Code --- */

let player = "player";
let dealer = "dealer";
let hidden = "hidden";

//track cards and card sums
var dealerSum = 0;
var playerSum = 0;

var dealerCards = new Array();
var playerCards = new Array();
var playerSplit = new Array();

var credits = 100;

//track aces to calculate CardSum
var dealerAceCount = 0;
var playerAceCount = 0;

var hasDoubled = false;

var deck;

//start game upon loading window
window.onload = function(){
    disableButtons(true);
}


/* --- cards, deck and related functions --- */

let suits = ["spades", "diamonds", "hearts", "clubs"];
let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.isHidden = false;
    }
}

//creates fresh deck of 52 cards
function getDeck(){
    deck = new Array();

    for(let i=0; i < suits.length; i++){
        for(let j=0; j<values.length; j++){
            deck.push(new card(suits[i], values[j]));
        }
    }
}

//shuffles deck at random
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
//1. deal 1 card to player 1 to dealer (hidden), then 1 to both
//2. enable/disable buttons accordingly

var running = false;

function gameStart(){
    getDeck();
    shuffle();

    //1. deal cards
    addCard(player);
    addCard(hidden);
    addCard(player);
    addCard(dealer);

    //2. enable/disable buttons
    disableButtons(false);

    //print stats
    printStats(player);
    printStats(dealer);
}

//enable or disable all buttons at beginning/end of game state
function disableButtons(value){
    if(value){
        document.getElementById("newRound").disabled = false;
        document.getElementById("hit").disabled = true;
        document.getElementById("stay").disabled = true;
        document.getElementById("double").disabled = true;
    }
    else{
        document.getElementById("newRound").disabled = true;
        document.getElementById("hit").disabled = false;
        document.getElementById("stay").disabled = false;
        document.getElementById("double").disabled = false;
    }
}

//adds a new card to the hand of either player or dealer
function addCard(person){
    if(person == dealer){
        //add card
        dealerCards.push(deck.pop());

        //adjust sum
        dealerSum = dealerSum + getCardValue(dealerCards[dealerCards.length-1]);

        //show onscreen
        showCard(dealer, dealerCards[dealerCards.length-1]);
    }

    else if(person ==hidden){
        //add card
        dealerCards.push(deck.pop());
        dealerCards[dealerCards.length-1].isHidden = true;
        
        //adjust sum
        dealerSum = dealerSum + getCardValue(dealerCards[dealerCards.length-1]);

        //show onscreen
        showCard(dealer, dealerCards[dealerCards.length-1]);
    }

    else if(person == player){
        playerCards.push(deck.pop());

        playerSum = playerSum + getCardValue(playerCards[playerCards.length-1]);
        document.getElementById("cardSumP").innerHTML = playerSum;


        showCard(player, playerCards[playerCards.length-1]);
    }
}

//prints stats of player/dealer to console
function printStats(person){
    if(person == dealer){
        for(let i = 0; i<dealerCards.length; i++){
            if(!dealerCards[i].isHidden){
                console.log("dealer: " + dealerCards[i].suit + " " + dealerCards[i].value);
            }
            else{
                console.log("dealer: hidden");
            }
        }
    }
    else{
        for(let i = 0; i<playerCards.length; i++){
            console.log("player: " + playerCards[i].suit + " " + playerCards[i].value);
        }
        console.log("playerSum: " + playerSum);
    }
}

//returns value of a handed card
function getCardValue(card){
    if(card.value == "A" && playerSum+11 > 21){
        return 1;
    }
    else if(card.value == "A"){
        return 11;
    }
    else if(card.value == "J" || card.value == "Q" || card.value == "K"){
        return 10;
    }
    else{
        return card.value;
    }
}

//entire action phase of dealer
/*
1. draws cards until sum >= 17
2. determine results based on sums
3. prints results to screen
4. enables new game button
5. add win to account
6. reset booleans
*/
function dealerPhase(){
    console.log("dealers turn");

    dealerCards[0].isHidden = false;
    

    //dealer draws until sum >= 17
    while(dealerSum < 17){
        addCard(dealer);
    }

    printStats(dealer);
    console.log("dealer: " + dealerSum);

    //determine result and print
    if(dealerSum <= 21 && dealerSum > playerSum){
        document.getElementById("results").innerHTML = "you lost to the dealer";
        if(hasDoubled){
            credits = credits - 20;
        }
        else{
            credits = credits - 10;
        }
    }
    else if(playerSum > 21){
        document.getElementById("results").innerHTML = "you overbought yourself";
        if(hasDoubled){
            credits = credits - 20;
        }
        else{
            credits = credits - 10;
        }
    }
    else if((playerSum <= 21 && playerSum > dealerSum) || (playerSum <= 21 && dealerSum > 21)){
        document.getElementById("results").innerHTML = "you won!";
        if(hasDoubled){
            credits = credits + 20;
        }
        else{
            credits = credits + 10;
        }
    }
    else if(dealerSum <= 21 && dealerSum == playerSum){
        document.getElementById("results").innerHTML = "you go even with the dealer";
    }

    document.getElementById("cardSumD").innerHTML = dealerSum;

    document.getElementById("credit").innerHTML = credits;

    //reset buttons
    disableButtons(true);

    //reset game values
    clearArray(playerCards);
    clearArray(dealerCards);
    clearArray(playerSplit);
    hasDoubled = false;
    dealerAceCount = 0;
    playerAceCount = 0;
    playerSum = 0;
    dealerSum = 0;
}

//function to reset arrays
function clearArray(array){
    while(array.length > 0){
        array.pop();
    }
}

//add card to screen
function showCard(person, card){
    var div = document.createElement("div");
    div.setAttribute("class", "col");

    var text;

    var parent;

    if(person == dealer){
        if(card.isHidden == true){
            text = document.createTextNode("hidden");
        }
        else{
            text = document.createTextNode(card.suit + " " + card.value);
        }

        parent = document.getElementById("dCardSlots");
    }
    else if(person == player){
        text = document.createTextNode(card.suit + " " + card.value);
        parent = document.getElementById("pCardSlots");
    }

    div.appendChild(text);
    parent.appendChild(div);
}

//removes all child nodes of div (for resetting hands)
function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/* --- button functions --- */
function newGame(){
    running = true;
    console.log("started");
    document.getElementById("results").innerHTML = "-- results --";
    removeAllChildNodes(document.getElementById("pCardSlots"));
    removeAllChildNodes(document.getElementById("dCardSlots"));
    gameStart();
}

function hit(){
    addCard(player);
    printStats(player);

    if(playerSum >= 21){
        dealerPhase();
    }
    
    //disable double after first hit
    document.getElementById("double").disabled = true;
}

function double(){
    addCard(player);
    printStats(player);
    hasDoubled = true;
    dealerPhase();
}

function restart(){
    location. reload();
}
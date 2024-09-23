const readline = require('node:readline');

class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [];
        this.isGameRunning = true;
        this.pile = new Pile();
        this.generatePlayers();
        this.dealCards();
        this.currentPlayerTurn = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.playRound();
    }

    generatePlayers() {
        for (let i = 1; i < 3; i++) {
            this.players.push(new Player(i));
            // const rl = readline.createInterface({
            //     input: process.stdin,
            //     output: process.stdout,
            // });
            // rl.question(`What's player ${i}?`, name => {
            //     rl.close();
            // });
        }
    }

    dealCards() {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            for (let i = 0; i < 4; i++) {
                const card = this.deck.cards.shift();
                player.addCard(card);
            }
        }
    }

    playRound() {
        while (this.isGameRunning) {
            console.log(`player ${this.currentPlayerTurn}: its your turn `);
            const actions = ["0: draw from deck", "1: take from pile"];
            let action;
            while (action === undefined) {
                this.rl.question(`What is you action? ${JSON.stringify(actions)}. 0 or 1 `, action => {
                    switch (action) {
                        case '0':
                            action = 0;
                            break;
                        case '1':
                            if (this.pile.length <= 0) {
                                console.log("cannot draw from pile. pile is empty");
                                break;
                            }
                            action = 1;
                            const cardFromPile = this.pile.pop();
                            console.log(`draw card from pile: ${cardFromPile}`);
                            rl.question(`which card in your hand will you like to switch? 0-3`, (answer) => {
                                if (parseInt(answer) < 0 || parseInt(answer) > 4) {
                                    const cardFromHand = this.players[this.currentPlayerTurn].handOfCards[parseInt(answer)];
                                    this.players[this.currentPlayerTurn].handOfCards[parseInt(answer)] = cardFromPile;
                                    this.pile.push(cardFromHand);
                                }
                            });
                            break;
                    }
                    this.rl.close();
                });
            }
        }
        this.currentPlayerTurn !== 0 ? this.currentPlayerTurn = 0 : this.currentPlayerTurn = 1;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.handOfCards = [];
        this.score = 0;
    }
    addCard(card) {
        this.handOfCards.push(card);
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.genDeck();
        this.shuffleDeck();
    }
    genDeck() {
        const suites = ['h', 'c', 'd', 's'];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        values.forEach((value) => {
            suites.forEach((suite) => {
                const card = new Card(suite, value);
                this.cards.push(card);
            });
        });
    }

    shuffleDeck() {
        for (let i = 0; i < 1000; i++) {
            let idx1 = Math.floor(Math.random() * this.cards.length);
            let idx2 = Math.floor(Math.random() * this.cards.length);
            while (idx1 === idx2) {
                idx2 = Math.floor(Math.random() * this.cards.length);
            }
            const temp = this.cards[idx1];
            this.cards[idx1] = this.cards[idx2];
            this.cards[idx2] = temp;
        }
    }

}
class Pile {
    constructor() {
        this.cards = [];
    }
}

class Card {
    constructor(suite, value) {
        this.suite = suite;
        this.value = value;
    };
}
const game = new Game();

class Game { }

class Player { }

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
                this.cards.push(`${value}${suite}`);
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
const d1 = new Deck();
console.log('✌️d1 --->', d1);

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
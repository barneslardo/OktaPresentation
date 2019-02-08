var Dealer = function(decks, suits, cards) {
  var pack = [], // cards yet to be dealt (stock/shoe)
    played = 0, // cards already dealt,
    suitsLen,
    cardsLen,
    i,
    j,
    // Fisher-Yates shuffle - http://jsfromhell.com/array/shuffle
    shuffle = function() {
      for (
        var j, x, p = pack, i = p.length;
        i;
        j = ~~(Math.random() * i), x = p[--i], p[i] = p[j], p[j] = x
      );
    };

  // pack defaults
  decks = decks || 1;
  suits = suits || ["heart", "clover", "diamond", "spade"];
  cards = cards || ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  suitsLen = j = suits.length;
  cardsLen = cards.length;

  // generate single deck
  while (j--) {
    for (i = 0; i < cardsLen; i++) {
      pack.push(suits[j] + cards[i]);
    }
  }

  // put the right number of decks in the pack
  while (--decks) {
    pack = pack.concat(pack.slice(0, suitsLen * cardsLen));
  }

  // shuffle the new pack
  shuffle();

  return {
    // deals from the top of the deck, defaults to 1 card
    deal: function(num) {
      num = num || 1;
      played += num;
      return pack.slice(played - num, played);
    },

    // put the played cards back in the deck and reshuffle
    resetDeck: function() {
      played = 0;
      shuffle();
    }
  };
};
module.exports = Dealer;

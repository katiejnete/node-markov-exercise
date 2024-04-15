/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const wordDict = {};
    this.words.forEach((val, idx, arr) => {
      if (!wordDict[val]) {
        wordDict[val] = [this.words[idx + 1]];
      } else if (wordDict[val] && idx !== arr.length - 1) {
        wordDict[val].push(this.words[idx + 1]);
      } else if (idx === arr.length - 1) {
        return wordDict;
      }
    });
    this.wordDict = wordDict;
  }

  /** return random text from chains */
  pickRan(len) {
    return Math.floor(Math.random() * len);
  }

  pickFirst(words, out, ran) {
    let first;
    while (!first) {
      if (out.length > 0 && words[ran] !== out[out.length - 1]) {
        first = words[ran];
        return first;
      } else if (out.length === 0) {
        ran = this.pickRan(words.length);
        first = words[ran];
        return first;
      } else {
        ran = this.pickRan(words.length);
      }
    }
  }

  pickSec(wordDict, ran, first) {
    const sec = wordDict[first];
    ran = this.pickRan(sec.length);
    return wordDict[first][ran];
  }

  makeText(numWords = 100) {
    const out = [];
    const words = this.words;
    let ran = this.pickRan(words.length);
    const wordDict = this.wordDict;
    while (ran !== words.length - 1) {
      const first = this.pickFirst(words, out, ran);
      const sec = this.pickSec(wordDict, ran, first);
      out.push(first, sec);
      if (out.length >= numWords) break;
      ran = this.pickRan(words.length);
    }
    if (out.length !== 0) return out.join(" ");
    else return this.makeText();
  }
}

module.exports = {
  MarkovMachine,
};

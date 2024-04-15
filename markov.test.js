const {MarkovMachine} = require("./markov");

describe("MarkovMachine class", function() {

    test('creates words array', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.words).toEqual(expect.any(Array));
        expect(mm.words).toHaveLength(5);
        });

    test('makes word chain', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.wordDict["the"]).toEqual(["cat", "hat"]);
        expect(mm.wordDict["hat"]).toEqual([undefined]);
        });

    test('makes text', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.makeText()).toEqual(expect.any(String));
        expect(mm.makeText()).toBeTruthy();
        expect(mm.makeText(50).length).toBeLessThanOrEqual(50);
        });
})
/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const {MarkovMachine} = require('./markov');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        let mm = new MarkovMachine(data);
        console.log(`... generated text from file '${path}'...`);
        console.log(mm.makeText());
    });
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        let mm = new MarkovMachine(resp.data);
        console.log('... generated text from that URL ...');
        console.log(mm.makeText());
    } catch (e) {
        console.error('Error:', e.message);
    }
}

const argv = process.argv;


if (argv[2]) {
    if (argv[2] === 'url') {
        webCat(argv[3]);
    } else if (argv[2] === 'file') {
        cat(argv[3]);
    }
} else return;
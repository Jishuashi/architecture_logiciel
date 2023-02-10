module.exports = { parseSentence: parseSentence };

function parseSentence(words) {
    var sentence = "";
    for (var i = 1; i < words.length; i++) {
        sentence = sentence + words[i] + " ";
    }
}
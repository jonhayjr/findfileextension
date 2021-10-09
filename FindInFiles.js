//Import modules
const fs = require('fs');
const readline = require('readline');

//Accepts parameter from user in command line.  If one isn't provided, defaults to SampleFile.txt
const fileToCheck = process.argv[2] || 'SampleFile.txt'; 

//Output filename  
const outputFile = 'Output.txt';

//Regex for docx, pdf and doc file extensions
const regex = /\w+\.(docx|pdf|doc)$/img;

//Create input and output
const rl = readline.createInterface({
    input: fs.createReadStream(fileToCheck),
    output: process.stdout,
    terminal: false
});

//Variable to store read data
let data = '';

//Try to read line data.
try {
    //Add line data to variable
    data = fs.readFileSync(fileToCheck).toString();
} catch (err) {
    console.error(err);
}

//Split lines, filter by regex, and each match to it's own line
const matchedLines = data.split("'")
                        .filter(l => {
                            return l.match(regex);
                        })
                        .join("\n")

//Write matched lines to output file
fs.writeFile(outputFile, matchedLines, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Matches can be found in ${outputFile}.`);
});
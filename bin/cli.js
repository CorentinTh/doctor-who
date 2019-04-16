const DataManager = require('..');
const program = require('commander');
const path = require('path');
const fs = require('fs');

const version = require(path.join(__dirname, '..', 'package.json')).version;
const languages = fs.readdirSync(path.join(__dirname, '..', 'data'))
    .map(f => f.replace('.json', ''))
    .join(', ');

program
    .version(version)
    .name('datamanager')
    .description('get a random value')
    .option('-a, --all', 'get all values')
    .option('-d, --doctors <doctors>', 'specify which doctors to get companions from. ex: 10,11', 'all')
    .option('-l, --language <language>', 'specify language. Available languages are: ' + languages, 'en')
    .option('-c, --count <n>', 'get n values')
    .option('-r, --random', 'get a random value. Same as without options')
    .parse(process.argv);

const doctors = typeof program.doctors === 'string' ? program.doctors : program.doctors.split(',');
const dataManager = new DataManager(doctors, program.language);

if (program.all) {
    console.log(JSON.stringify(dataManager.all()));
} else if (program.count) {
    console.log(JSON.stringify(dataManager.get(program.count)));
} else {
    console.log(dataManager.random());
}

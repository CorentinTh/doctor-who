const path = require('path');
const fs = require('fs');

const dataPath = path.join('..', 'data');
const extension = '.json';

/**
 * @class Generator - Generate values
 */
class Generator {

    /**
     * Generator constructor
     * @param {String|Array} [doctors=all] - The list of doctor number to get companions from, or 'all' for all doctors
     * @param {String} [language=en] - The language to look for
     */
    constructor(doctors = 'all', language = 'en') {
        this.names = [];

        const filePath = path.join(__dirname, dataPath, language + extension);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Language "${language}" is not available. You can contribute to add it.`);
        }

        const data = require(filePath);

        if (typeof doctors === 'string' && doctors === 'all') {
            for (const doctor in data) {
                if (data.hasOwnProperty(doctor)) {
                    this._appendUniques(data[doctor]);
                }
            }
        } else if (Array.isArray(doctors) && doctors.length > 0) {
            for (const doctor of doctors) {
                if (data.hasOwnProperty(doctor)) {
                    this._appendUniques(data[doctor]);
                } else {
                    throw new Error(`Unknown doctor number '${doctor}'.`);
                }
            }
        } else {
            throw new Error(`Doctors must be either 'all' or an array of string. Received ${typeof doctors} with value ${doctors}.`);
        }
    }

    /**
     * Get one random value
     * @returns {String} - A random value
     */
    random() {
        return this._shuffle()[0];
    }

    /**
     * Get all values
     * @returns {String[]} - All random values
     */
    all() {
        return this.names;
    }

    /**
     * Get several random values
     * @param {Number} [count=1] - The amount of values to retrieve
     * @returns {String []} - A list of random values of length count.
     */
    get(count = 1) {

        if (count > this.names.length) {
            throw new Error(`Not enough values to retrieve ${count} unique items.`);
        } else if (count < 1) {
            throw new Error(`Count must be greater than 0. Received ${count}.`);
        }

        return this._shuffle().slice(0, count);
    }

    /**
     * Get a list of randomly shuffled values
     * @returns {String[]} - The list with randomly shuffled value
     * @private
     */
    _shuffle() {
        const tmp = Object.assign(this.names);

        for (let i = tmp.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
        }

        return tmp;
    }

    /**
     * Append companions to the internal array
     * @param {Array} data - an array of companions
     * @private
     */
    _appendUniques(data) {
        data.forEach((name) => {
            if (this.names.indexOf(name) === -1) {
                this.names.push(name);
            }
        })
    }
}

module.exports = Generator;
